# Implementation Plan: To-Do List Life Dashboard

## Overview

Implement a zero-dependency, client-side productivity dashboard as exactly three deliverable files: `index.html`, `css/style.css`, and `js/script.js`. No build step, no package manager, no test runner. All verification is manual browser testing by opening `index.html` directly. Tasks are ordered by dependency: project skeleton → shared utilities → widget logic → CSS polish → README.

## Tasks

- [x] 1. Create the project skeleton
  - [x] 1.1 Create `index.html` with full page structure
    - Add `<!DOCTYPE html>`, `<html>`, `<head>` with charset, viewport meta, and `<link rel="stylesheet" href="css/style.css">`
    - Add `<body>` containing: `#theme-toggle` button, `.dashboard-grid` wrapper, and a `<script src="js/script.js" defer>` tag at the end of `<body>`
    - Add four empty section placeholders inside `.dashboard-grid`: `#greeting-widget`, `#todo-widget`, `#timer-widget`, `#links-widget`
    - Verify the page opens in a browser without errors (empty widgets are fine at this stage)
    - _Requirements: 5.1, 5.6, 8.2, 8.3_

  - [x] 1.2 Create `css/style.css` and `js/script.js` as empty stubs
    - Create `css/style.css` with a single comment `/* To-Do Life Dashboard styles */`
    - Create `js/script.js` with a single comment `// To-Do Life Dashboard logic`
    - Confirm `index.html` loads in a browser with no 404 errors in DevTools Network tab
    - _Requirements: 8.2, 8.3_

- [x] 2. Implement the Storage module in `js/script.js`
  - [x] 2.1 Write the `Storage` module
    - Implement `Storage.get(key, defaultValue)` — calls `localStorage.getItem(key)`, wraps `JSON.parse` in a try/catch, returns `defaultValue` on any error or when the key is absent
    - Implement `Storage.set(key, value)` — calls `localStorage.setItem(key, JSON.stringify(value))` inside a try/catch; on QuotaExceededError, log a console warning and return silently
    - Implement `Storage.remove(key)` — calls `localStorage.removeItem(key)`
    - Use the namespaced keys: `tld_tasks`, `tld_links`, `tld_theme`, `tld_name` (no `tld_timer` key)
    - _Requirements: 6.1, 6.2, 6.4_

- [x] 3. Implement the ThemeManager module in `js/script.js`
  - [x] 3.1 Write the `ThemeManager` module
    - Implement `ThemeManager.init()` — reads `tld_theme` from `Storage.get("tld_theme", "light")`, sets `document.documentElement.setAttribute("data-theme", theme)`
    - Implement `ThemeManager.toggle()` — reads current theme, flips to the other value, calls `Storage.set("tld_theme", newTheme)`, updates `data-theme` attribute on `<html>`
    - Implement `ThemeManager.get()` — returns the current `data-theme` attribute value
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 4. Implement the GreetingWidget module
  - [x] 4.1 Add `#greeting-widget` markup to `index.html`
    - Inside `#greeting-widget` add: `<p id="clock"></p>`, `<p id="date"></p>`, `<p id="greeting"></p>`
    - Add name control: `<input id="name-input" type="text" placeholder="Your name">` and `<button id="name-save">Save</button>`
    - _Requirements: 1.1, 1.2, 1.5, 1.6, 1.7_

  - [x] 4.2 Write the `GreetingWidget` module in `js/script.js`
    - Implement `GreetingWidget._getGreeting(hour)` — returns `"Good Morning"` for hours 0–11, `"Good Afternoon"` for 12–17, `"Good Evening"` for 18–23
    - Implement `GreetingWidget._loadName()` — calls `Storage.get("tld_name", "")`
    - Implement `GreetingWidget._saveName(name)` — trims the value, calls `Storage.set("tld_name", trimmed)`
    - Implement `GreetingWidget._tick()` — reads `new Date()`, formats time as HH:MM:SS (zero-padded), formats date as a human-readable string (e.g. "Monday, October 12, 2026"), builds greeting string appending name if non-empty, updates `#clock`, `#date`, and `#greeting` text content
    - Implement `GreetingWidget.init()` — populates `#name-input` with stored name, wires `#name-save` click to `_saveName` then re-calls `_tick()`, starts `setInterval(_tick, 1000)`, calls `_tick()` immediately
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8_

- [x] 5. Implement the TodoWidget module
  - [x] 5.1 Add `#todo-widget` markup to `index.html`
    - Add: `<input id="task-input" type="text" maxlength="200" placeholder="New task…">`, `<button id="task-add">Add</button>`
    - Add: `<p id="task-warning" class="warning" hidden></p>` for duplicate/empty feedback
    - Add: `<ul id="task-list"></ul>`
    - _Requirements: 2.1, 2.4, 2.14_

  - [x] 5.2 Write the `TodoWidget` module in `js/script.js`
    - Declare a module-scoped `let _nextId = Date.now()` and `function _genId() { return _nextId++; }` for collision-safe IDs
    - Implement `TodoWidget._load()` — calls `Storage.get("tld_tasks", [])`, deduplicates by `text.trim().toLowerCase()` keeping the first occurrence (handles Requirement 2.9)
    - Implement `TodoWidget._save()` — calls `Storage.set("tld_tasks", tasks)`
    - Implement `TodoWidget._isDuplicate(text, excludeId)` — compares `text.trim().toLowerCase()` against every task whose `id !== excludeId`; returns boolean
    - Implement `TodoWidget._addTask(text)` — returns early (keeps input focused, shows warning) if trimmed text is empty or `_isDuplicate` returns true; otherwise pushes `{id: _genId(), text: trimmed, done: false}`, calls `_save()`, calls `_render()`, clears input
    - Implement `TodoWidget._deleteTask(id)` — filters task out, saves, renders
    - Implement `TodoWidget._toggleTask(id)` — flips `done` on matching task, saves, renders
    - Implement `TodoWidget._editTask(id, newText)` — if `newText` is null or trims to empty, no-op; if `_isDuplicate(newText, id)` is true, show inline warning, no-op; otherwise updates text, saves, renders
    - Implement `TodoWidget._render()` — clears `#task-list`, rebuilds one `<li>` per task with: checkbox input (checked = done, toggles on change), label (strikethrough class when done), Edit button (calls `window.prompt` then `_editTask`), Delete button
    - Implement `TodoWidget.init()` — loads tasks, renders, wires Add button click and Enter keydown on `#task-input`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10, 2.11, 2.12, 2.13, 2.14, 2.15_

- [x] 6. Checkpoint — Greeting, Storage, Theme, and Todo working
  - Open `index.html` in a browser and manually verify: clock ticks, date shows, greeting changes by hour, name saves and reloads, tasks can be added/toggled/deleted/edited, duplicate tasks are rejected with a warning, theme toggle switches colors and persists on reload. Ask the user if anything is unclear before continuing.

- [x] 7. Implement the TimerWidget module
  - [x] 7.1 Add `#timer-widget` markup to `index.html`
    - Add: `<p id="timer-mode">Session</p>`, `<p id="timer-display">25:00</p>`
    - Add: `<button id="timer-start">Start</button>`, `<button id="timer-stop">Stop</button>`, `<button id="timer-reset">Reset</button>`
    - Add: `<p id="timer-status" aria-live="polite"></p>` for visual completion alert
    - _Requirements: 3.1, 3.2, 3.7, 3.8, 3.9_

  - [x] 7.2 Write the `TimerWidget` module in `js/script.js`
    - Declare module-scoped state: `let _state = "idle"`, `let _mode = "session"`, `let _remaining = 1500`, `let _intervalId = null`
    - Implement `TimerWidget._clearInterval()` — calls `clearInterval(_intervalId)`, sets `_intervalId = null`
    - Implement `formatTime(seconds)` — returns zero-padded `"MM:SS"` string (e.g. `formatTime(65)` → `"01:05"`)
    - Implement `TimerWidget._render()` — updates `#timer-display` with `formatTime(_remaining)`, updates `#timer-mode` text with `"Session"` or `"Break"`
    - Implement `TimerWidget._onComplete()` — calls `_clearInterval()`; if mode is session: set mode to break, remaining to 300, show "Session complete! Time for a break." in `#timer-status`; if mode is break: set mode to session, remaining to 1500, show "Break complete! Ready for the next session?" in `#timer-status`; set state to idle; call `_render()`
    - Implement `TimerWidget._tick()` — decrements `_remaining` by 1; if `_remaining <= 0`, calls `_onComplete()`; else calls `_render()`
    - Implement `TimerWidget._start()` — guard: only act if state is `"idle"` or `"paused"`; sets state to `"running"`, clears `#timer-status`, starts `setInterval(_tick, 1000)`, calls `_render()`
    - Implement `TimerWidget._stop()` — guard: only act if state is `"running"`; calls `_clearInterval()`, sets state to `"paused"`, calls `_render()`
    - Implement `TimerWidget._reset()` — calls `_clearInterval()`, sets state to `"idle"`, sets remaining to 1500 if mode is session or 300 if mode is break, clears `#timer-status`, calls `_render()`
    - Implement `TimerWidget.init()` — sets initial state (idle, session, 1500), calls `_render()`, wires Start/Stop/Reset buttons
    - No LocalStorage reads or writes anywhere in this module
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10, 3.11_

- [x] 8. Implement the LinksWidget module
  - [x] 8.1 Add `#links-widget` markup to `index.html`
    - Add form fields: `<input id="link-name-input" type="text" placeholder="Label">`, `<input id="link-url-input" type="url" placeholder="https://…">`, `<button id="link-add">Add</button>`
    - Add per-field warning paragraphs (hidden by default): `<p id="link-name-warning" class="warning" hidden></p>`, `<p id="link-url-warning" class="warning" hidden></p>`
    - Add: `<ul id="links-list"></ul>`
    - _Requirements: 4.3, 4.5_

  - [x] 8.2 Write the `LinksWidget` module in `js/script.js`
    - Reuse the same module-scoped `_genId()` counter (or declare a second one for links — both produce unique IDs)
    - Implement `LinksWidget._load()` — calls `Storage.get("tld_links", [])`
    - Implement `LinksWidget._save()` — calls `Storage.set("tld_links", links)`
    - Implement `LinksWidget._addLink(name, url)` — validate: if label empty, add `.input-error` to `#link-name-input` and show `#link-name-warning`; if URL empty, add `.input-error` to `#link-url-input` and show `#link-url-warning`; if either is invalid, return without adding; otherwise push `{id: _genId(), name: name.trim(), url: url.trim()}`, save, render; clear any `.input-error` classes on the next `input` event on either field
    - Implement `LinksWidget._deleteLink(id)` — filters link out, saves, renders
    - Implement `LinksWidget._render()` — clears `#links-list`, rebuilds one `<li>` per link with: `<a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.name}</a>` and a Delete button
    - Implement `LinksWidget.init()` — loads links, renders, wires Add button click, wires `input` event listeners on both inputs to clear `.input-error` and hide warnings
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8_

- [x] 9. Wire the `init()` bootstrap in `js/script.js`
  - [x] 9.1 Implement the top-level `init()` function and DOMContentLoaded listener
    - Write `function init() { ThemeManager.init(); GreetingWidget.init(); TodoWidget.init(); TimerWidget.init(); LinksWidget.init(); document.getElementById("theme-toggle").addEventListener("click", () => ThemeManager.toggle()); }`
    - Register `document.addEventListener("DOMContentLoaded", init)`
    - Confirm no external network requests: open DevTools → Network tab, reload, verify zero requests to external origins
    - _Requirements: 5.6, 6.3, 7.1_

- [x] 10. Apply CSS styling and responsive layout in `css/style.css`
  - [x] 10.1 Define CSS custom properties and dark-theme overrides
    - Under `:root` define variables: `--color-bg`, `--color-surface`, `--color-text`, `--color-text-muted`, `--color-accent`, `--color-border`, `--color-warning` with light-theme values meeting WCAG AA contrast
    - Add `html[data-theme="dark"]` block that overrides each variable with dark-theme values; verify both themes satisfy WCAG AA contrast (4.5:1 for normal text, 3:1 for large text)
    - Apply `background-color: var(--color-bg); color: var(--color-text)` to `body`
    - _Requirements: 5.5, 7.2, 7.5_

  - [x] 10.2 Implement the responsive dashboard grid layout
    - Write `.dashboard-grid` as a CSS Grid container with `grid-template-columns: repeat(2, 1fr)` and appropriate `gap`
    - Add `@media (max-width: 767px) { .dashboard-grid { grid-template-columns: 1fr; } }` to collapse to single column below 768 px
    - Apply a consistent sans-serif `font-family` stack to `body` (system-ui, Segoe UI, Arial, sans-serif — no external font import)
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.6_

  - [x] 10.3 Write widget card styles and component-specific styles
    - Style each widget section as a card: `background: var(--color-surface)`, border-radius, padding, box-shadow
    - Style `#theme-toggle` button: fixed or absolute position, clearly visible in both themes
    - Style `#task-list` items: flex row with checkbox, label, Edit and Delete buttons; add `.done` class rule for `text-decoration: line-through` on the label
    - Style `.warning` paragraphs: color `var(--color-warning)`, small font-size
    - Style `.input-error` inputs: red/amber border to highlight missing fields
    - Style `#timer-display`: large monospace font, prominent size
    - Style `#links-list` anchors: display as block or flex row with delete button, color inheriting from theme
    - _Requirements: 2.5, 3.1, 4.1, 4.5, 5.4_

- [x] 11. Checkpoint — full integration and manual smoke test
  - Open `index.html` in a browser and walk through the complete manual acceptance checklist: clock updates every second, date format is human-readable, greeting changes with hour, name saves and restores on reload, tasks add/toggle/delete/edit correctly, duplicates are rejected with a warning, timer counts down, Stop pauses, Reset restores 25:00, Session→Break and Break→Session transitions work, visual alerts appear in `#timer-status`, links add/delete/open in new tab, missing-field warnings show for both fields simultaneously, theme toggle switches instantly and persists on reload, light theme is the default when LocalStorage is empty, no console errors, layout collapses to single column below 768 px. Ask the user if anything needs adjustment before finalising.

- [x] 12. Write the README
  - [x] 12.1 Create `README.md` at the repository root
    - Include: project title and brief description of the four widgets and three challenges
    - Include: instruction "Open `index.html` directly in any modern browser (Chrome, Firefox, Edge, Safari) — no installation required"
    - Include: GitHub Pages deployment steps (Settings → Pages → Deploy from branch main / root)
    - Include: definition-of-done checklist (see Notes section)
    - _Requirements: 8.5_

## Notes

- Tasks marked with `*` are optional — none exist in this plan because every task is a required implementation step
- No `package.json`, no `node_modules`, no test runner, no build step — the project ships as plain files
- All verification is manual browser testing; the Manual Acceptance Checklist in Checkpoint task 11 covers every acceptance criterion in Requirements 1–8
- The Timer_Widget intentionally has no LocalStorage persistence — it always resets to idle/Session/25:00 on page load (Requirement 3.3)
- The `window.prompt()` call for task editing is specified in Requirement 2.11 and is verified manually
- The `rel="noopener noreferrer"` attribute on Quick_Link anchors is a security best-practice when using `target="_blank"`
- The `_genId()` monotonic counter is seeded with `Date.now()` to prevent ID collisions when tasks or links are created in rapid succession

### Definition of Done

- [~] Live site accessible via GitHub Pages URL
- [~] All 4 widgets work on the deployed site (Clock, To-Do, Timer, Quick Links)
- [~] All 3 challenges work: Light/Dark theme, Custom Name, Prevent Duplicate tasks
- [~] Light theme is default when LocalStorage is empty
- [~] No console errors on load
- [~] `.kiro/` folder visible in GitHub repository

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["2.1"] },
    { "id": 2, "tasks": ["3.1"] },
    { "id": 3, "tasks": ["4.1", "4.2"] },
    { "id": 4, "tasks": ["5.1", "5.2"] },
    { "id": 5, "tasks": ["7.1", "7.2"] },
    { "id": 6, "tasks": ["8.1", "8.2"] },
    { "id": 7, "tasks": ["9.1"] },
    { "id": 8, "tasks": ["10.1", "10.2", "10.3"] },
    { "id": 9, "tasks": ["12.1"] }
  ]
}
```
