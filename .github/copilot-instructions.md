# Project Overview

This is a modular monorepo using PNPM workspaces. Shared packages live in `/packages`. Apps live in `/apps`. The architecture supports both SSR and SPA environments.

## Coding Standards

- Use TypeScript with `strict` mode enabled
- Prefer named exports over default exports
- Use `@songshare/` scoped imports for shared modules
- Structure code using modular, reusable patterns
- Follow workspace organization conventions for `pnpm`

## Tooling and Automation

- Never use Python or Python-based tools for any project tasks, including package management, scripting, or automation
- All scripting and automation must use JavaScript, TypeScript, or shell scripts as appropriate for the project
- Prefer tools that integrate cleanly with Node.js and maintain transparency in operations

## Contribution Guidance

- Capture user consent before triggering any backend processes, including email
- Ensure all communication flows are clearly documented

## Copilot Behavior

- Prioritize suggestions that align with this repo’s modular architecture
- Avoid recommending tools that require Python or introduce opaque dependencies
- Treat compliance, user experience, and spiritual integrity as core design pillars
