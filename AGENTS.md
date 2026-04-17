# AGENTS.md

## Purpose

- Make minimal, safe changes that match the existing codebase.
- Preserve existing user-facing behavior and business logic unless the task explicitly requires changing them.
- Prefer current repo-native patterns over carrying forward legacy implementation details.
- Use legacy code as behavioral reference when helpful, not as a template to copy directly.
- Prefer consistency with nearby files over introducing new patterns.

## Commands

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Run tests: `npm run test`
- Run test UI: `npm run test-ui`
- Run coverage: `npm run coverage`
- Clean coverage output: `npm run clean:coverage`

## Tech stack and repo defaults

- Use TypeScript.
- Use React function components and hooks.
- Use Vite for local development.
- Use TanStack Router for routing.
- Use TanStack Query for server state.
- Use Zustand only for existing app-level client state that is already stored there.
- Use shadcn/ui, Radix primitives, and existing Tailwind patterns before creating new UI primitives.
- Use the `@/` alias for imports from `src` when it matches nearby code.

## Routing rules

- Follow the TanStack Router file-based routing structure under `src/routes`.
- Do not edit `src/routeTree.gen.ts`. It is generated and will be overwritten.
- Preserve route params, search params, redirects, and navigation behavior unless the task explicitly requires changing them.
- Prefer matching existing route loader, `beforeLoad`, `pendingComponent`, and layout patterns before inventing new ones.

## Auth rules

- This app bootstraps MSAL before rendering and lazily imports auth modules in multiple places.
- Preserve the current MSAL initialization flow unless the task is specifically about auth.
- When changing authenticated routes, keep redirect behavior to `/login` and preserve the `redirect` search param flow.
- Avoid introducing duplicate auth state sources. Query cache is the main source for current user data, while Zustand is used to sync for non-React consumers.

## Data-fetching rules

- Prefer TanStack Query for API-backed server state.
- Reuse existing query keys and query option helpers when possible.
- Match nearby cache invalidation and prefetch patterns.
- Do not introduce a second server-state approach unless explicitly requested.
- Prefer the existing `http` client in `src/api/httpClient.ts` for API access.
- Preserve domain, scope, auth, and error-handling behavior in the HTTP client unless the task explicitly requires changing it.

## State management rules

- Reuse existing Zustand stores instead of creating new global state unnecessarily.
- Keep local UI state local when possible.
- Prefer derived state over syncing state with effects when possible.
- Avoid copying TanStack Query data into local state unless there is a clear reason.

## React and component rules

- Keep components focused and reasonably small.
- Preserve existing public props and component contracts unless explicitly asked to change them.
- Avoid unnecessary `useEffect`.
- Avoid premature `useMemo` and `useCallback`; use them when they clearly help or when nearby code already relies on stable references.
- Prevent unnecessary rerenders where practical, but do not trade readability for minor micro-optimizations.
- Reuse existing shared layout, loader, toast, and UI state components before adding new ones.

## Styling and UI rules

- Prefer existing shadcn/ui components from `src/components/ui`.
- Match existing Tailwind utility style and spacing patterns.
- Reuse existing layout shells such as `MainHeader` and `MainContentSidebar` when working inside authenticated pages.
- Keep light/dark theme behavior compatible with the existing `ThemeProvider`.

## Forms and validation

- Follow existing feature-level form patterns.
- Reuse existing types and schemas when available.
- Keep validation and transformation logic close to the relevant feature unless the repo already centralizes it.

## Testing and validation

- After code changes, run the smallest relevant checks first.
- For type or build-sensitive changes, prefer `npm run build`.
- For lint-sensitive changes, run `npm run lint`.
- For logic-heavy changes, run targeted Vitest tests when available, then broader tests only if needed.
- If not all validation was run, say clearly what was and was not verified.

## Editing constraints

- Do not edit generated files.
- Do not edit `dist` output.
- Treat `src/OldApp` as legacy reference code unless the task explicitly targets it.
- When rebuilding legacy features, carry over core logic and required UX outcomes, but implement them using the current stack and shared patterns.
- Do not add dependencies unless necessary for the requested task.
- Do not refactor unrelated code just because it could be improved.
- Keep diffs small and focused.
- Prefer the existing naming and file organization used near the code you are changing.

## Review workflow

- For review requests, explain the issues first.
- Prefer the smallest reasonable fix that solves the stated problem.
- Flag any risky behavior changes explicitly before applying them.
- When uncertain, state the assumption explicitly instead of silently changing behavior.
- When comparing against legacy code, focus on missing product behavior or business rules, not implementation-level differences alone.

## Repo map

- `src/routes` — TanStack Router file-based routes and route layouts
- `src/api` — HTTP client and API modules
- `src/hooks` — shared hooks, including TanStack Query hooks
- `src/store` — Zustand stores
- `src/components` — shared UI, layout, and theme components
- `src/features` — feature-specific UI and logic
- `src/types` — shared TypeScript types
- `src/test` — test setup utilities

## Known repo-specific notes

- `routeTree.gen.ts` is auto-generated by TanStack Router and must not be edited.
- MSAL is initialized during bootstrap in `src/main.tsx` and auth modules are imported lazily elsewhere.
- The Query Client is created centrally and passed into the router context.
- Current user data uses TanStack Query with a shared query options helper and is synced into Zustand for non-React consumers.
- ESLint ignores `dist` and `src/OldApp`.
- Vitest uses `jsdom`, shared setup from `src/test/setupTests.ts`, and coverage excludes test files, declaration files, `src/routeTree.gen.ts`, and `src/main.tsx`.
- `src/OldApp` is legacy and may be useful for understanding historical behavior, payloads, edge cases, and business rules.
- New or migrated features should follow current app patterns in `src/features`, shared UI in `src/components`, and the existing API/query architecture.
- Legacy structure, class components, and old UI-library patterns should not be copied forward unless explicitly required.

## Error handling and user feedback

- Reuse existing API error-handling patterns before introducing new ones.
- Use existing toast/feedback conventions and match nearby feature implementations for success and error states.
- Prefer consistent user-facing error messages and avoid introducing new feedback styles without a clear reason.

## Naming conventions

- Prefer existing naming patterns used nearby.
- Keep API function, query helper, hook, and type names aligned within the same feature.
- Follow existing verb-based API naming and `*QueryOptions` helper naming when applicable.

## Test conventions

- Add or update tests for bug fixes, logic-heavy changes, and behavior with meaningful regression risk.
- Prefer the same test location and structure used by nearby files.
- Reuse shared test utilities from `src/test` when possible.
- Prefer focused tests that cover the changed behavior over broad new test suites.
