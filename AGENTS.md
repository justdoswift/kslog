# AGENTS.md

## Release Discipline

- Any repository content change must bump the `workctl` version before commit. Use `npm version <version> --no-git-tag-version` so `package.json` and `package-lock.json` stay aligned.
- Use a patch version bump by default for fixes, docs, generated snapshots, build output, and small behavior changes unless the user explicitly asks for a minor or major version.
- Rebuild checked-in output with `npm run build` after source changes, then run `npm test` and `npm pack --dry-run`.
- After implementing requested changes, commit and push to GitHub unless the user explicitly says not to.
- Keep `dist/` in sync with `src/` because the one-line installer uses the repository build output.
