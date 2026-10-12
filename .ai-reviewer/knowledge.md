# maruti reviewer notes

## Architecture

Everyday is a dependency-free browser to-do app using native HTML, CSS, and JavaScript ES modules. `app.js` owns UI state and event wiring; `tasks.js` contains pure task operations, `storage.js` handles localStorage persistence, and `dom.js` renders task rows. `server.js` provides a small allowlisted static HTTP server, while `test/` contains Node’s built-in test-suite coverage for server and persistence behavior.

## Conventions

- Keep task-domain operations in `tasks.js`, persistence in `storage.js`, and rendering in `dom.js` as specified in `CONTRIBUTING.md`.
- Use ES modules and two-space indentation; `package.json` sets `"type": "module"` and all imports use explicit `.js` extensions.
- Prefer immutable task updates: `addTask` returns a new array, `toggleTask` maps to a copied task, and `deleteTask` filters in `tasks.js`.
- Normalize task input with `trim()` and enforce the 200-character limit in `tasks.js`; blank submissions are rejected in `app.js`.
- Render user-controlled titles with `textContent`, never HTML interpolation. This is used for labels and delete-button accessible names in `dom.js`, and for status text in `app.js`.
- Preserve accessibility behavior: controls use semantic inputs/buttons, delete buttons have `aria-label`s, filters update `aria-pressed`, and focus is restored after task actions (`app.js`, `dom.js`).
- Persist under the `everyday-tasks` localStorage key (`storage.js`); loading validates every record’s ID, title, and boolean completion state before recovery.
- The server should expose only explicitly allowed assets and support `GET`/`HEAD`; `test/server.test.js` verifies traversal protection, malformed URLs, method rejection, and empty HEAD bodies.
- Tests use Node’s built-in `node:test` and `node:assert/strict`; browser storage is replaced with a scoped mock in `test/storage.test.js`.

## Intentional non-standard choices

- Invalid saved entries are skipped while valid entries are recovered, and corrupted storage is not rewritten during loading (`storage.js`, `test/storage.test.js`).
- The app remains usable when storage access or quota operations fail: `loadTasks`/`saveTasks` catch errors and `app.js` displays a warning.
- There are no runtime or test dependencies; syntax checking is implemented by the custom `npm run build` script in `package.json`.
- The server binds to loopback (`127.0.0.1`) and serves a fixed asset allowlist rather than acting as a general static file server (`server.js`).

## Watch out for

- Do not introduce `innerHTML` or unsafe interpolation for task titles; it would violate the established XSS-safe rendering rule.
- Do not bypass `addTask` validation or create task objects without unique string IDs, a trimmed bounded title, and `completed: false`.
- Do not mutate the existing `tasks` array or task objects in domain operations; callers rely on replacement arrays.
- Preserve storage fault tolerance and partial recovery; malformed localStorage data must not throw or overwrite the original data.
- Avoid exposing arbitrary filesystem paths or binding the server publicly without an explicit security requirement.
- Changes to filters, completion, deletion, or clear-completed behavior should preserve keyboard focus and the All/Active/Completed semantics covered by `app.js` and `CONTRIBUTING.md`.