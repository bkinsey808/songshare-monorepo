# 📱 apps/

This directory contains all runnable frontend applications in the monorepo. Each app is self-contained and configured to integrate cleanly with shared packages such as UI components, logic utilities, and configuration presets.

---

## 🧭 Structure

```
apps/
├─ ssr-cloudflare/          # Main public-facing SPA or SSR application
└─ spa-mobile/       # React Native or mobile-optimized frontend (optional)
```

Each folder typically includes:

- `package.json` for local dependencies and scripts
- `src/` as the entry point for application code
- `vite.config.ts`, `next.config.js`, or equivalent depending on framework

---

## 🛠 Shared Dependencies

Apps rely on internal packages located in `../packages/`:

- `@songshare/ui` – Design system components
- `@songshare/utils` – Shared utilities
- `@songshare/config` – Linting, formatting, and TypeScript configs

Make sure these are properly linked via PNPM workspaces and used with `paths` aliases defined in root `tsconfig.json`.

---

## 🚀 Scripts & Commands

Common tasks (run from the root):

```bash
pnpm dev:ssr-cloudflare # Start the SSR app
pnpm build:spa-mobile   # Build the mobile app
pnpm lint               # Lint all workspaces
```

You can define these in the root `package.json` using `--filter` for scoped commands.

---

## 💡 Conventions

- Follow feature-based folder structure inside each app (`src/features`, `src/pages`, etc.)
- Use environment variables via `.env.local` per app, and keep secrets out of the repo
- Prefer modular imports from `packages/` over duplication

---

## 🤝 Contribution

Before contributing to any app:

1. Make sure you're on Node.js v18+ and have PNPM installed.
2. Run `pnpm install` from the root to ensure correct workspace linking.
3. Respect coding standards defined by shared config in `packages/config`.

---

Got something you'd like documented here—like testing setup or deployment flows? I’d be happy to expand this to match your architecture.
