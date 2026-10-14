# To-Do List Life Dashboard

A personal productivity homepage built as a single, standalone web page — no installation, no framework, no backend required. All user data is saved in the browser's LocalStorage.

---

## Widgets

| Widget | Description |
|---|---|
| **Clock / Greeting** | Displays the current date, live time (updated every second), and a time-of-day greeting ("Good Morning / Afternoon / Evening"). Supports a custom saved name. |
| **To-Do List** | Add, complete, edit, and delete tasks. Tasks survive page refreshes via LocalStorage. Duplicate tasks (case-insensitive) are blocked. |
| **Pomodoro Timer** | A focus timer that alternates between a 25-minute Session and a 5-minute Break. Controlled with Start, Stop, and Reset buttons. |
| **Quick Links** | Save frequently visited URLs as one-click bookmarks. Each link opens in a new tab. |

## Challenges

| Challenge | Description |
|---|---|
| **Light / Dark Theme** | Toggle between a light and dark color scheme at any time. The chosen theme is saved in LocalStorage and restored on next load. Light theme is the default when no preference has been stored. |
| **Custom Name** | Enter your name in the Greeting widget and save it. The greeting will include your name (e.g., "Good Morning, Rhema") on every visit. |
| **Prevent Duplicate Tasks** | Attempting to add or edit a task to a name that already exists in the list is blocked with a visual warning. |

---

## How to Run Locally

Open `index.html` directly in any modern browser (Chrome, Firefox, Edge, Safari) — no installation required.

---

## GitHub Pages Deployment

1. Push this repository to GitHub (use GitHub Desktop or the Git CLI).
2. On GitHub, open the repository and go to **Settings → Pages**.
3. Under **Branch**, select **main** and set the folder to **/ (root)**.
4. Click **Save**.
5. GitHub Pages will publish the site. The live URL will appear at the top of the Pages settings page in the format:
   `https://<your-username>.github.io/CodingCamp-12October26-rhemaWiraInteosaDongalemba/`

---

## Definition of Done

- [ ] Live site is accessible via the GitHub Pages URL
- [ ] All 4 widgets work on the deployed site (Clock, To-Do, Timer, Quick Links)
- [ ] All 3 challenges work: Light/Dark Theme, Custom Name, Prevent Duplicate Tasks
- [ ] Light theme is the default when LocalStorage is empty
- [ ] No console errors on load
- [ ] `.kiro/` folder is visible in the GitHub repository

---

## Project Structure

```
CodingCamp-12October26-rhemaWiraInteosaDongalemba/
├── index.html       # Main (and only) HTML file
├── css/
│   └── style.css    # All styles
├── js/
│   └── script.js    # All JavaScript logic
├── .kiro/           # Kiro spec and design files
└── README.md
```
