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

## Quick start

### Backend

```bash
cd backend
cp .env.example .env   # fill secrets
npm install
npm run seed           # optional
node server.js
```

### Frontend

```bash
cd frontend
cp .env.example .env.local   # or create with NEXT_PUBLIC_* vars
npm install
npm run dev
```

Point `NEXT_PUBLIC_API_BASE_URL`, `NEXT_PUBLIC_STORAGE_URL`, and `NEXT_PUBLIC_SOCKET_URL` at your API.

## Author

Built by **Minhal128**.

## Docs

Open [docs/index.html](./docs/index.html) in a browser for the full product documentation (install, features, deployment).
