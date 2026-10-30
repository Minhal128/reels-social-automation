# Reels Social Automation

End-to-end AI social / reels automation platform (Next.js frontend + Node.js API backend).

**Created by [Minhal128](https://github.com/Minhal128).**

## License

MIT — see [LICENSE](./LICENSE). Copyright (c) 2026 Minhal128.

## Structure

```
backend/   # Node.js API (Express, MongoDB, Socket.io, queues)
frontend/  # Next.js app
```

## Local setup

Needs Node 22+ and MongoDB on `127.0.0.1:27017`. The same `.env` keys and `npm run seed` are what
`backend/reelease-api-install.sh` uses on the server, so local and deployed behave the same.

### Backend → http://localhost:3000

```bash
cd backend
cp .env.example .env   # fill JWT_SECRET, TOKEN_ENCRYPTION_KEY, SESSION_SECRET + AI keys
npm install
npm run seed           # roles, plans, AI models (reads KIE/GEMINI/OPENAI keys), landing page + images,
                       # FAQs, 3 blog posts (public at /articles/<slug>), sample testimonials (APP_DEMO_MODE=true only)
npm run dev            # run from inside backend/ — the installer gate resolves public/ from the cwd
```

### Frontend → http://localhost:5176

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

### AI keys

| Key | Powers |
|-----|--------|
| `KIE_API_KEY` | text/image → image, text/image → video, video motion, characters |
| `GEMINI_API_KEY` | AI captions (default model `gemini-3.8-flash`) |
| `OPENAI_API_KEY` | AI captions with GPT models (optional) |

Set them in `backend/.env` before `npm run seed`, or later in **Admin → AI Models / AI Provider** (re-seeding keeps keys saved there).

Kie.ai (and OpenAI, for captions from an image) download media from `APP_URL/uploads/...`, so image-to-image,
image-to-video, video motion and OpenAI image captions need a public `APP_URL`. Locally, expose port 3000 with a tunnel (e.g. `cloudflared tunnel --url http://localhost:3000`),
put that URL in `APP_URL`, and restart the backend. Text-to-image, text-to-video and captions work on plain localhost.

## Author

Built by **Minhal128**.

## Docs

Open [docs/index.html](./docs/index.html) in a browser for the full product documentation (install, features, deployment).
