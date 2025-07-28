# 🧰 packages/

This folder contains all reusable modules that power the monorepo's applications. Each package is self-contained, versionable, and designed to integrate cleanly across SPA, SSR, and backend workflows.

---

## 📦 Common Package Types

```
packages/
├─ shared-ui/            # Design system and React components
├─ consent/              # Logic for user consent, privacy policies
├─ pricing/              # Dual pricing strategies and upgrade flows
├─ email-engine/         # Server-triggered communication logic
├─ backend-client/       # Shared API client for SSR + SPA
├─ analytics/            # Event tracking and attribution
├─ config/               # Linting, formatting, and TS base configs
```

Each module should:

- Have its own `package.json`
- Declare internal or external dependencies explicitly
- Include unit tests (via Vitest or similar)
- Be documented with a clear usage README inside the package

---

## 🧪 Local Development

Packages are linked via PNPM workspaces and auto-symlinked into consuming apps. No need to publish—just edit and use.

Example:

```ts
import { Button } from "@acme/shared-ui";
```

You can run tests in isolation:

```bash
pnpm test --filter shared-ui
```

Or build only what's needed:

```bash
pnpm build --filter pricing
```

---

## 🤝 Contribution Guidelines

1. Follow TypeScript strict mode across all packages
2. Use platform-agnostic code—no direct DOM or Node globals unless clearly scoped
3. Add `README.md` inside each package to describe usage and design intent
4. Prefer named exports and composable logic

---

## 🛠 Linting & Formatting

Most packages extend centralized configs:

```ts
// tsconfig.json
{
  "extends": "../../configs/tsconfig.base.json"
}
```

```js
// eslint.config.js
export { default } from "../../configs/eslint.config.js";
```

This ensures consistent rules across all modules and apps.

---

## 📚 Suggestions

For new packages:

- Use meaningful names that reflect intent
- Document what the module _does_, not just how to use it
- Prefer files like `index.ts`, `hooks.ts`, `types.ts` over monolithic blobs

---

Let me know if you want me to draft a README template for individual packages too (like `consent/` or `email-engine`). Happy to help shape your modular ecosystem.
