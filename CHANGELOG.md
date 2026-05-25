# Changelog

## 2026-05-25

### v0.1-shipped
- Shipped a public TypeScript control plane for permit packages, readiness blockers, inspection posture, and construction-safe submission operations.
- Added permit-lane, readiness-risks, inspection-posture, verification, and docs routes.
- Added KG Embedded tie-back documentation, CNAME, vitest coverage, and browser-rendered README proof assets.

### v1.0-prod — production hardening (Claude Code · Platform/SRE)
- CI: Node 20 + 22 matrix running lint, typecheck, coverage, build, demo, smoke, and `npm audit`.
- Tests: added `src/services/render.test.ts`; raised `src/services/` coverage to 100% statements (gate ≥ 60%).
- Tooling: added ESLint (flat config, typescript-eslint) and `typecheck`/`coverage`/`start`/`prerender` scripts.
- License: added AGPL-3.0-or-later `LICENSE` file.
- Dependabot: weekly npm + github-actions updates.
- Security: added `SECURITY.md`; `npm audit --audit-level=high` in CI (0 known high/critical).
- Deploy: static prerender → GitHub Pages at `permits.kineticgain.com` (`scripts/prerender.ts` + `pages.yml`).
- Repo hygiene: PR template, issue templates, `outreach.md` scaffold, README badges + Production status block.
