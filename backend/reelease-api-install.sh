#!/usr/bin/env bash
#
# reelease-install.sh — Deploy the Reelease AI **API backend** on Ubuntu 22.04/24.04.
# Idempotent: safe to re-run. Bakes in every gotcha found during the first install.
#
# WHAT IT DOES
#   - Installs Node 22, MongoDB 8 (checks AVX first!), Redis, Nginx, Certbot, PM2
#   - Creates an app user, deploys the API code, writes a correct .env
#   - Runs npm install + the DB seeder (once), starts under PM2 with boot-persistence
#   - Configures Nginx reverse proxy + Let's Encrypt SSL (websocket-ready for socket.io)
#
# WHAT IT DOES NOT DO
#   - The web step at /install — do that in
#     the browser AFTER this script finishes. See the final printed instructions.
#   - The Next.js frontend (separate zip) — see notes at the bottom.
#
# USAGE
#   1) Put the API zip on the server (e.g. /root/reelease-ai-api.zip) OR pre-extract to APP_DIR.
#   2) Edit the CONFIG block below.
#   3) sudo bash reelease-install.sh
#
set -euo pipefail

# ─────────────────────────── CONFIG (edit these) ───────────────────────────
DOMAIN="yourdomain.com"                 # domain the API is served on
LETSENCRYPT_EMAIL="you@example.com"         # email for SSL cert notices
SOURCE_ZIP="/root/reelease-ai-api.zip"      # path to the API zip; leave as-is if APP_DIR already has code
APP_DIR="/var/www/reelease"                 # where the API lives
APP_USER="reelease"                          # unix user that runs the app (created if missing)
PORT="3000"                                  # port the API listens on
MONGO_DB="reelease"                          # mongo database name
FRONTEND_ORIGIN="https://${DOMAIN}"          # origin allowed to call the API (CORS). If the
                                             # Next.js frontend is on another domain, put it here.
APP_DEMO_MODE="false"                        # false = production (real OTP+email). true = OTP fixed 123456, no mail.
SETUP_SWAP="true"                            # create a 2G swapfile if none (good for <=2GB RAM boxes)
ADMIN_EMAIL="admin@reeleaseai.com"           # seeded super-admin
ADMIN_PASSWORD=""                            # leave empty to auto-generate a strong one

APP_ID_VALUE="MkNTUlBDS0NOSg=="
# ────────────────────────────────────────────────────────────────────────────

log()  { echo -e "\n\033[1;36m▶ $*\033[0m"; }
ok()   { echo -e "\033[1;32m  ✓ $*\033[0m"; }
warn() { echo -e "\033[1;33m  ! $*\033[0m"; }
die()  { echo -e "\033[1;31m  ✗ $*\033[0m" >&2; exit 1; }

# ── .env editing helpers — preserve the shipped file, edit keys in place.
# Safe for values containing '=' ':' '/' (base64 APP_ID, URIs). Uses $ENVF (set in step 6).
env_get()  { grep -E "^$1=" "$ENVF" 2>/dev/null | head -1 | cut -d= -f2-; }
env_set()  {  # always set/replace a key's value
  python3 - "$ENVF" "$1" "$2" <<'PY'
import sys, re
f, k, v = sys.argv[1], sys.argv[2], sys.argv[3]
try: lines = open(f).read().splitlines()
except FileNotFoundError: lines = []
out, done = [], False
for ln in lines:
    if re.match(rf'^{re.escape(k)}=', ln): out.append(f'{k}={v}'); done = True
    else: out.append(ln)
if not done: out.append(f'{k}={v}')
open(f, 'w').write('\n'.join(out) + '\n')
PY
}
env_fill() { [ -n "$(env_get "$1")" ] || env_set "$1" "$2"; }  # set only when empty/missing

[ "$(id -u)" -eq 0 ] || die "Run as root (sudo)."
export DEBIAN_FRONTEND=noninteractive

# ── Auto-detect the public IP for SERVER_ADDR ──
SERVER_ADDR="$(curl -fsS4 https://ifconfig.me 2>/dev/null || curl -fsS4 https://api.ipify.org 2>/dev/null || hostname -I | awk '{print $1}')"
[ -n "$SERVER_ADDR" ] || die "Could not detect server public IP; set SERVER_ADDR manually."
ok "Server public IP (SERVER_ADDR) = $SERVER_ADDR"

# ─────────────────────────── 0. Optional swap ───────────────────────────
if [ "$SETUP_SWAP" = "true" ] && ! swapon --show | grep -q '/swapfile'; then
  log "Creating 2G swapfile"
  fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile >/dev/null && swapon /swapfile
  grep -q '/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
  ok "Swap enabled"
fi

# ─────────────────────────── 1. Base packages ───────────────────────────
log "Installing base packages (curl, unzip, nginx, certbot, git)"
apt-get update -qq
apt-get install -y -qq curl ca-certificates gnupg unzip git nginx certbot python3-certbot-nginx >/dev/null
ok "Base packages ready"

# ─────────────────────────── 2. Node.js 22 + PM2 ───────────────────────────
NODE_MAJOR="$(node -v 2>/dev/null | sed 's/v\([0-9]*\).*/\1/' || echo 0)"
if [ "${NODE_MAJOR:-0}" -lt 22 ]; then
  log "Installing Node.js 22 LTS"
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash - >/dev/null 2>&1
  apt-get install -y -qq nodejs >/dev/null
fi
ok "Node $(node -v), npm $(npm -v)"
command -v pm2 >/dev/null || { log "Installing PM2"; npm install -g pm2 >/dev/null 2>&1; }
ok "PM2 $(pm2 -v)"

# ─────────────────────────── 3. MongoDB (AVX check!) ───────────────────────────
if ! command -v mongod >/dev/null; then
  log "Checking CPU AVX support (required by MongoDB >= 5.0)"
  grep -qw avx /proc/cpuinfo || die "CPU has NO AVX. MongoDB 6+ will crash. Use MongoDB Atlas (cloud) or install 4.4, then set MONGODB_URI accordingly and remove this MongoDB block."
  ok "AVX present"
  log "Installing MongoDB 8.0"
  curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | gpg --dearmor -o /usr/share/keyrings/mongodb-server-8.0.gpg
  . /etc/os-release
  echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu ${UBUNTU_CODENAME:-noble}/mongodb-org/8.0 multiverse" > /etc/apt/sources.list.d/mongodb-org-8.0.list
  apt-get update -qq
  apt-get install -y -qq mongodb-org >/dev/null
  # cap WiredTiger cache on small boxes
  grep -q 'cacheSizeGB' /etc/mongod.conf || sed -i 's/^\(\s*\)engine:.*/&/' /etc/mongod.conf 2>/dev/null || true
  python3 - <<'PY' 2>/dev/null || true
import re
p="/etc/mongod.conf"; s=open(p).read()
if "wiredTiger:" not in s:
    s=re.sub(r"(storage:\n)", r"\1  wiredTiger:\n    engineConfig:\n      cacheSizeGB: 0.25\n", s, count=1)
    open(p,"w").write(s)
PY
fi
systemctl enable --now mongod >/dev/null 2>&1
sleep 2
systemctl is-active --quiet mongod || die "mongod failed to start (check: journalctl -u mongod)"
ok "MongoDB active ($(mongod --version | head -1))"

# ─────────────────────────── 4. Redis ───────────────────────────
if ! command -v redis-cli >/dev/null; then
  log "Installing Redis (used by BullMQ queues)"
  apt-get install -y -qq redis-server >/dev/null
  systemctl enable --now redis-server >/dev/null 2>&1
fi
[ "$(redis-cli ping 2>/dev/null)" = "PONG" ] || die "Redis not responding"
ok "Redis PONG"

# ─────────────────────────── 5. App user + code ───────────────────────────
id "$APP_USER" >/dev/null 2>&1 || { log "Creating user $APP_USER"; useradd -m -s /bin/bash "$APP_USER"; }
mkdir -p "$APP_DIR"

if [ ! -f "$APP_DIR/server.js" ]; then
  [ -f "$SOURCE_ZIP" ] || die "No code in $APP_DIR and SOURCE_ZIP ($SOURCE_ZIP) not found. Put the API zip there."
  log "Extracting API code from $SOURCE_ZIP"
  TMPX="$(mktemp -d)"
  unzip -q "$SOURCE_ZIP" -x '__MACOSX/*' -d "$TMPX"
  # handle a single top-level wrapper folder (e.g. reelease-ai-api/)
  SRC="$TMPX"
  if [ ! -f "$TMPX/server.js" ]; then
    INNER="$(find "$TMPX" -maxdepth 2 -name server.js -printf '%h\n' | head -1)"
    [ -n "$INNER" ] && SRC="$INNER"
  fi
  cp -a "$SRC/." "$APP_DIR/"
  rm -rf "$TMPX"
  ok "Code deployed to $APP_DIR"
else
  ok "Code already present in $APP_DIR (skipping extract)"
fi

# ─────────────────────────── 6. .env — KEEP the shipped file, fill only blanks ───────────────────────────
# The app SHIPS a .env that already contains the correct APP_ID (and other keys).
# Do NOT regenerate from scratch — that was the original mistake. Preserve the shipped
# file and only set what is empty or must be derived from CONFIG.
ENVF="$APP_DIR/.env"
if [ ! -f "$ENVF" ]; then
  if [ -f "$APP_DIR/.env.example" ]; then cp "$APP_DIR/.env.example" "$ENVF"; else : > "$ENVF"; fi
  warn "No shipped .env found — started one from .env.example"
else
  ok "Using the shipped .env (preserving APP_ID + existing values, filling blanks only)"
fi

[ -n "$ADMIN_PASSWORD" ] || ADMIN_PASSWORD="$(openssl rand -base64 12 | tr -dc 'A-Za-z0-9' | head -c 16)"

# Production/runtime-critical → always set from CONFIG:
env_set  APP_ID          "$APP_ID_VALUE"          # enforce documented value (also fixes a wrong one)
env_set  APP_URL         "https://${DOMAIN}"
env_set  SERVER_ADDR     "$SERVER_ADDR"
env_set  ALLOWED_ORIGINS "$FRONTEND_ORIGIN"
env_set  NODE_ENV        "production"
env_set  PORT            "$PORT"
env_set  APP_DEMO_MODE   "$APP_DEMO_MODE"
env_set  ADMIN_EMAIL     "$ADMIN_EMAIL"

# Preserve if already set, otherwise fill (never rotate secrets on re-run):
env_fill MONGODB_URI          "mongodb://127.0.0.1:27017/${MONGO_DB}"   # keeps a pre-set Atlas URI
env_fill JWT_SECRET           "$(openssl rand -hex 32)"
env_fill TOKEN_ENCRYPTION_KEY "$(openssl rand -hex 32)"

# Admin password: replace only the shipped default/empty, then record it:
cur_ap="$(env_get ADMIN_PASSWORD)"
if [ -z "$cur_ap" ] || [ "$cur_ap" = "admin123" ]; then
  env_set ADMIN_PASSWORD "$ADMIN_PASSWORD"
  echo "$ADMIN_PASSWORD" > "$APP_DIR/.admin_password.txt"
  ok "Admin password set (saved to $APP_DIR/.admin_password.txt)"
else
  ok "Existing admin password preserved"
fi
chmod 600 "$ENVF"

# ─────────────────────────── 7. Install deps + seed ───────────────────────────
chown -R "$APP_USER":"$APP_USER" "$APP_DIR"
log "npm install (this pulls sharp/ffmpeg/pdfjs — can take a minute)"
sudo -u "$APP_USER" -H bash -lc "cd '$APP_DIR' && npm install --omit=dev --no-audit --no-fund" >/dev/null
ok "Dependencies installed"

if [ ! -f "$APP_DIR/.seeded" ]; then
  log "Seeding database (admin, templates, settings)"
  sudo -u "$APP_USER" -H bash -lc "cd '$APP_DIR' && npm run seed" && sudo -u "$APP_USER" touch "$APP_DIR/.seeded"
  ok "Seed complete"
else
  ok "Already seeded (skipping)"
fi

# ─────────────────────────── 8. PM2 ───────────────────────────
log "Starting app under PM2"
sudo -u "$APP_USER" -H bash -lc "cd '$APP_DIR' && pm2 describe reelease >/dev/null 2>&1 && pm2 restart reelease --update-env || pm2 start server.js --name reelease --time"
sudo -u "$APP_USER" -H bash -lc "pm2 save" >/dev/null
# boot-persistence via systemd for the app user
env PATH="$PATH" pm2 startup systemd -u "$APP_USER" --hp "/home/$APP_USER" 2>/dev/null | grep '^sudo env' | sed 's/^sudo //' | bash || true
ok "PM2 running + enabled on boot"

# ─────────────────────────── 9. Nginx + SSL ───────────────────────────
log "Configuring Nginx for $DOMAIN"
cat > "/etc/nginx/sites-available/reelease" <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN};

    client_max_body_size 100M;

    location / {
        proxy_pass http://127.0.0.1:${PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;         # websocket (socket.io)
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 300s;
        proxy_send_timeout 300s;
    }
}
NGINX
ln -sf /etc/nginx/sites-available/reelease /etc/nginx/sites-enabled/reelease
nginx -t && systemctl reload nginx
ok "Nginx reloaded"

log "Obtaining Let's Encrypt certificate (DNS for $DOMAIN must point here)"
if certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "$LETSENCRYPT_EMAIL" --redirect >/dev/null 2>&1; then
  ok "HTTPS enabled for $DOMAIN"
else
  warn "Certbot failed (DNS not pointing here yet?). Re-run: certbot --nginx -d $DOMAIN"
fi

# ─────────────────────────── Done ───────────────────────────
cat <<DONE

$(ok "API deploy finished.")

NEXT — do this in a browser (the only manual step):
  1) Open  https://${DOMAIN}/install
  2) Log in with:  ${ADMIN_EMAIL}  /  (see ${APP_DIR}/.admin_password.txt)

REMEMBER:
  - If APP_DEMO_MODE=false, fill the SMTP_* vars in ${APP_DIR}/.env or OTP emails won't send,
    then: sudo -u ${APP_USER} pm2 restart reelease --update-env
  - Logs:   sudo -u ${APP_USER} pm2 logs reelease
  - Restart: sudo -u ${APP_USER} pm2 restart reelease --update-env

FRONTEND (Next.js, separate zip) — deploy separately:
  - Extract, set its API base-URL env to  https://${DOMAIN}  (must match ALLOWED_ORIGINS above),
    npm install && npm run build, run on a port (e.g. 3001) under PM2.
  - Either give the frontend its own domain, OR serve it at / and route /api, /socket.io,
    /uploads to port ${PORT} in Nginx.
DONE
