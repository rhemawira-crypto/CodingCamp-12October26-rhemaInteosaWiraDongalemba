// To-Do Life Dashboard logic

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
// Storage Module
// Safe JSON read/write wrappers over localStorage.
// Keys: tld_tasks, tld_links, tld_theme, tld_name
// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
const Storage = {
  /**
   * Retrieves and JSON-parses the value stored under `key`.
   * Returns `defaultValue` when the key is absent or the stored
   * value cannot be parsed.
   *
   * @param {string} key
   * @param {*} defaultValue
   * @returns {*}
   */
  get(key, defaultValue) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return defaultValue;
      return JSON.parse(raw);
    } catch {
      return defaultValue;
    }
  },

  /**
   * JSON-serialises `value` and writes it to localStorage under `key`.
   * Silently swallows QuotaExceededError (logs a console warning);
   * re-throws other unexpected errors.
   *
   * @param {string} key
   * @param {*} value
   */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      if (err instanceof DOMException && (
        err.name === 'QuotaExceededError' ||
        err.name === 'NS_ERROR_DOM_QUOTA_REACHED'  // Firefox variant
      )) {
        console.warn(`[Storage] localStorage quota exceeded Ã¢â‚¬â€ could not save key "${key}".`);
      } else {
        throw err;
      }
    }
  },

  /**
   * Removes the entry for `key` from localStorage.
   *
   * @param {string} key
   */
  remove(key) {
    localStorage.removeItem(key);
  },
};

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
// Future modules will be appended below this line
// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
// ThemeManager Module
// Handles light/dark theme initialisation, toggling, and persistence.
// Theme is applied as a `data-theme` attribute on <html>.
// Keys: tld_theme  Default: "light"
// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
const ThemeManager = {
  /**
   * Reads the saved theme from Storage and applies it to <html>.
   * Falls back to "light" when no theme is stored.
   *
   * Satisfies Requirements 7.1, 7.4
   */
  init() {
    const theme = Storage.get("tld_theme", "light");
    document.documentElement.setAttribute("data-theme", theme);
  },

  /**
   * Flips the active theme between "light" and "dark",
   * persists the new value, and updates the <html> attribute
   * so CSS custom-property overrides take effect immediately.
   *
   * Satisfies Requirements 7.2, 7.3
   */
  toggle() {
    const current = this.get();
    const newTheme = current === "light" ? "dark" : "light";
    Storage.set("tld_theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  },

  /**
   * Returns the value of the `data-theme` attribute currently set
   * on the <html> element.
   *
   * @returns {"light"|"dark"}
   *
   * Satisfies Requirement 7.2
   */
  get() {
    return document.documentElement.getAttribute("data-theme") || "light";
  },
};

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
// GreetingWidget Module
// Handles live clock, date display, time-of-day greeting, and custom name.
// DOM targets: #clock, #date, #greeting, #name-input, #name-save
// Key: tld_name  Default: ""
// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
const GreetingWidget = {
  /**
   * Returns the appropriate greeting string for the given hour (0Ã¢â‚¬â€œ23).
   *  00Ã¢â‚¬â€œ11 Ã¢â€ â€™ "Good Morning"
   *  12Ã¢â‚¬â€œ17 Ã¢â€ â€™ "Good Afternoon"
   *  18Ã¢â‚¬â€œ23 Ã¢â€ â€™ "Good Evening"
   *
   * @param {number} hour  Integer in [0, 23]
   * @returns {"Good Morning"|"Good Afternoon"|"Good Evening"}
   *
   * Satisfies Requirements 1.5
   */
  _getGreeting(hour) {
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  },

  /**
   * Reads the custom name from Storage.
   *
   * @returns {string}
   *
   * Satisfies Requirement 1.6
   */
  _loadName() {
    return Storage.get("tld_name", "");
  },

  /**
   * Trims `name` and writes it to Storage.
   *
   * @param {string} name
   *
   * Satisfies Requirements 1.7, 1.8
   */
  _saveName(name) {
    const trimmed = name.trim();
    Storage.set("tld_name", trimmed);
  },

    _fitDate() {
    const clockEl = document.getElementById("clock");
    const dateEl  = document.getElementById("date");
    if (!clockEl || !dateEl) return;

    dateEl.style.letterSpacing = "0px";
    dateEl.style.transform = "none";

    const clockW = clockEl.getBoundingClientRect().width;
    const dateW  = dateEl.getBoundingClientRect().width;
    const gaps   = dateEl.textContent.length - 1;
    if (!clockW || !dateW || gaps < 1) return;

    const spacing = Math.max(0, (clockW - dateW) / gaps);
    dateEl.style.letterSpacing = spacing + "px";
    dateEl.style.transform = `translateX(${spacing / 2}px)`;
  },
  /**
   * Reads the current time, updates #clock, #date, and #greeting.
   * Called once immediately and then every second by setInterval.
   *
   * Satisfies Requirements 1.1, 1.2, 1.3, 1.4
   */
  _tick() {
    const now = new Date();

    // Ã¢â€â‚¬Ã¢â€â‚¬ Clock: HH:MM:SS (zero-padded) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    const timeStr = `${hh}:${mm}:${ss}`;

    // Ã¢â€â‚¬Ã¢â€â‚¬ Date: e.g. "Monday, October 12, 2026" Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
    const dateStr = now.toLocaleDateString("en-US", {
      weekday: "long",
      year:    "numeric",
      month:   "long",
      day:     "numeric",
    });

    // Ã¢â€â‚¬Ã¢â€â‚¬ Greeting: time-of-day prefix + optional custom name Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
    const greeting = this._getGreeting(now.getHours());
    const name     = this._loadName();
    const greetStr = name ? `${greeting}, ${name}!` : `${greeting}!`;

    // Ã¢â€â‚¬Ã¢â€â‚¬ Update DOM Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
    const clockEl    = document.getElementById("clock");
    const dateEl     = document.getElementById("date");
    const greetingEl = document.getElementById("greeting");

    if (clockEl)    clockEl.textContent    = timeStr;
    if (dateEl && dateEl.textContent !== dateStr) {
        dateEl.textContent = dateStr;
        this._fitDate();
        }
    if (greetingEl) greetingEl.textContent = greetStr;
  },

  /**
   * Bootstraps the GreetingWidget:
   *  1. Populates #name-input with the stored name.
   *  2. Wires #name-save click Ã¢â€ â€™ _saveName() then _tick().
   *  3. Starts a 1-second interval calling _tick().
   *  4. Calls _tick() immediately so the UI is populated before the
   *     first interval fires.
   *
   * Satisfies Requirements 1.1, 1.6, 1.7, 1.8
   */
  init() {
    const nameInput = document.getElementById("name-input");
    const nameSave  = document.getElementById("name-save");

    // Restore previously saved name into the input field
    if (nameInput) {
      nameInput.value = this._loadName();
    }

    // Save on button click, then refresh displayed greeting
    if (nameSave) {
      nameSave.addEventListener("click", () => {
        const value = nameInput ? nameInput.value : "";
        this._saveName(value);
        this._tick();
      });
    }
    window.addEventListener("resize", () => this._fitDate());
    if (document.fonts) {
      document.fonts.ready.then(() => this._fitDate());
    }
    // Start live clock
    setInterval(() => this._tick(), 1000);

    // Populate immediately (no blank flash on load)
    this._tick();
  },
};

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
// Shared ID Generator
// Module-scoped monotonic counter seeded from Date.now() so that
// IDs generated within the same millisecond are still unique.
// Used by both TodoWidget and LinksWidget.
// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
let _nextId = Date.now();
function _genId() { return _nextId++; }

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
// TodoWidget Module
// Handles task add, toggle, delete, edit, duplicate detection, and LocalStorage sync.
// DOM targets: #task-input, #add-task-btn, #task-list, #todo-warning
// Key: tld_tasks  Default: []
// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
const TodoWidget = {
  /** @type {Array<{id: number, text: string, done: boolean}>} */
  _tasks: [],

  /**
   * Reads tasks from LocalStorage, deduplicates by text (case-insensitive, trimmed),
   * keeping the first occurrence of each duplicate (Requirement 2.9).
   *
   * @returns {Array<{id: number, text: string, done: boolean}>}
   */
  _load() {
    const raw = Storage.get("tld_tasks", []);
    const seen = new Set();
    const deduped = [];
    for (const task of raw) {
      const key = task.text.trim().toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        deduped.push(task);
      }
    }
    return deduped;
  },

  /**
   * Serialises the current task array to LocalStorage.
   *
   * Satisfies Requirement 2.8
   */
  _save() {
    Storage.set("tld_tasks", this._tasks);
  },

  /**
   * Returns true when `text` (trimmed, lowercased) already exists in
   * `_tasks` for any task whose id is not `excludeId`.
   * Pass `excludeId` when editing so a task is never a duplicate of itself.
   *
   * @param {string}         text
   * @param {number|undefined} excludeId
   * @returns {boolean}
   *
   * Satisfies Requirements 2.14, 2.15
   */
  _isDuplicate(text, excludeId) {
    const normalised = text.trim().toLowerCase();
    return this._tasks.some(
      (t) => t.id !== excludeId && t.text.trim().toLowerCase() === normalised
    );
  },

  /**
   * Attempts to add a new task.
   * - No-ops (keeping input focused and showing warning) when text is empty
   *   or a duplicate exists.
   * - Otherwise pushes a new task, saves, and re-renders.
   *
   * @param {string} text
   *
   * Satisfies Requirements 2.1, 2.2, 2.3, 2.14
   */
  _addTask(text) {
    const trimmed = text.trim();
    const inputEl = document.getElementById("task-input");
    const warningEl = document.getElementById("task-warning");

    // Guard: empty input
    if (trimmed === "") {
      if (warningEl) warningEl.textContent = "Task text cannot be empty.";
      if (inputEl) inputEl.focus();
      return;
    }

    // Guard: duplicate
    if (this._isDuplicate(trimmed)) {
      if (warningEl) warningEl.textContent = "A task with that text already exists.";
      if (inputEl) inputEl.focus();
      return;
    }

    // Clear any previous warning
    if (warningEl) warningEl.textContent = "";

    this._tasks.push({ id: _genId(), text: trimmed, done: false });
    this._save();
    this._render();

    // Clear the input field after successful add
    if (inputEl) inputEl.value = "";
  },

  /**
   * Removes the task with the given `id`, saves, and re-renders.
   *
   * @param {number} id
   *
   * Satisfies Requirement 2.7
   */
  _deleteTask(id) {
    this._tasks = this._tasks.filter((t) => t.id !== id);
    this._save();
    this._render();
  },

  /**
   * Flips the `done` state on the task with the given `id`, saves, and re-renders.
   *
   * @param {number} id
   *
   * Satisfies Requirements 2.5, 2.6
   */
  _toggleTask(id) {
    const task = this._tasks.find((t) => t.id === id);
    if (task) {
      task.done = !task.done;
      this._save();
      this._render();
    }
  },

  /**
   * Edits the text of the task identified by `id`.
   * - No-op when `newText` is null (prompt cancelled) or trims to empty.
   * - No-op (with inline warning) when `newText` would create a duplicate.
   * - Otherwise updates text, saves, and re-renders.
   *
   * @param {number}      id
   * @param {string|null} newText
   *
   * Satisfies Requirements 2.11, 2.12, 2.13, 2.15
   */
  _editTask(id, newText) {
    if (newText === null) return;
    const trimmed = newText.trim();
    if (trimmed === "") return;

    if (this._isDuplicate(trimmed, id)) {
      // Show inline warning on the task's own warning element if it exists,
      // otherwise fall back to the global warning element.
      const inlineWarning = document.getElementById(`todo-warn-${id}`);
      const fallback = document.getElementById("task-warning");
      if (inlineWarning) {
        inlineWarning.textContent = "Another task with that text already exists.";
      } else if (fallback) {
        fallback.textContent = "Another task with that text already exists.";
      }
      return;
    }

    const task = this._tasks.find((t) => t.id === id);
    if (task) {
      task.text = trimmed;
      this._save();
      this._render();
    }
  },

  /**
   * Clears #task-list and rebuilds one <li> per task containing:
   *  - a checkbox (checked when done; toggles on change)
   *  - a label (strikethrough class when done)
   *  - an Edit button (prompts for new text then calls _editTask)
   *  - a Delete button
   *  - an inline warning <span> for edit-duplicate feedback
   *
   * Satisfies Requirements 2.1, 2.5, 2.6, 2.7, 2.10, 2.11
   */
  _render() {
    const listEl = document.getElementById("task-list");
    if (!listEl) return;

    listEl.innerHTML = "";

    for (const task of this._tasks) {
      const li = document.createElement("li");
      li.className = "task-item";

      // Ã¢â€â‚¬Ã¢â€â‚¬ Checkbox Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.done;
      checkbox.setAttribute("aria-label", `Mark "${task.text}" as ${task.done ? "incomplete" : "complete"}`);
      checkbox.addEventListener("change", () => this._toggleTask(task.id));

      // Ã¢â€â‚¬Ã¢â€â‚¬ Label Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
      const label = document.createElement("label");
      label.textContent = task.text;
      if (task.done) label.classList.add("task-done");

      // Ã¢â€â‚¬Ã¢â€â‚¬ Edit button Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.className = "task-edit-btn";
      editBtn.setAttribute("aria-label", `Edit task: ${task.text}`);
      editBtn.addEventListener("click", () => {
        const newText = window.prompt("Edit task:", task.text);
        this._editTask(task.id, newText);
      });

      // Ã¢â€â‚¬Ã¢â€â‚¬ Delete button Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "task-delete-btn";
      deleteBtn.setAttribute("aria-label", `Delete task: ${task.text}`);
      deleteBtn.addEventListener("click", () => this._deleteTask(task.id));

      // Ã¢â€â‚¬Ã¢â€â‚¬ Inline warning (for edit-duplicate feedback) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
      const inlineWarn = document.createElement("span");
      inlineWarn.id = `todo-warn-${task.id}`;
      inlineWarn.className = "task-warning";

      li.appendChild(checkbox);
      li.appendChild(label);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
      li.appendChild(inlineWarn);

      listEl.appendChild(li);
    }
  },

  /**
   * Bootstraps the TodoWidget:
   *  1. Loads and deduplicates tasks from LocalStorage.
   *  2. Renders the initial task list.
   *  3. Wires the Add button click event.
   *  4. Wires Enter keydown on #task-input (Requirement 2.4).
   *
   * Satisfies Requirements 2.1, 2.4, 2.9
   */
  init() {
    this._tasks = this._load();
    this._render();

    const inputEl = document.getElementById("task-input");
    const addBtn  = document.getElementById("task-add");

    if (addBtn) {
      addBtn.addEventListener("click", () => {
        const text = inputEl ? inputEl.value : "";
        this._addTask(text);
      });
    }

    if (inputEl) {
      inputEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          this._addTask(inputEl.value);
        }
      });

      // Clear global warning as user starts typing a new value
      inputEl.addEventListener("input", () => {
        const warningEl = document.getElementById("task-warning");
        if (warningEl) warningEl.textContent = "";
      });
    }
  },
};

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// TimerWidget Module
// Pomodoro-style countdown timer: 25-min session / 5-min break.
// DOM targets: #timer-display, #timer-mode, #timer-status,
//              #timer-start, #timer-stop, #timer-reset
// No LocalStorage reads or writes.
// Requirements: 3.1â€“3.11
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

// Module-scoped state (outside the object literal to avoid `this` collisions)
let _state     = "idle";    // "idle" | "running" | "paused"
let _mode      = "session"; // "session" | "break"
let _remaining = 1500;      // seconds (25 min default)
let _intervalId = null;

/**
 * Formats a total number of seconds into a zero-padded "MM:SS" string.
 * e.g. formatTime(65) â†’ "01:05"
 *
 * @param {number} seconds  Non-negative integer
 * @returns {string}
 *
 * Satisfies Requirement 3.2
 */
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const TimerWidget = {
  /**
   * Cancels the running interval and nulls the handle.
   *
   * Satisfies Requirement 3.3
   */
  _clearInterval() {
    clearInterval(_intervalId);
    _intervalId = null;
  },

  /**
   * Updates #timer-display with the formatted remaining time and
   * #timer-mode with "Session" or "Break".
   *
   * Satisfies Requirements 3.1, 3.2
   */
  _render() {
    const displayEl = document.getElementById("timer-display");
    const modeEl    = document.getElementById("timer-mode");

    if (displayEl) displayEl.textContent = formatTime(_remaining);
    if (modeEl)    modeEl.textContent    = _mode === "session" ? "Session" : "Break";
  },

  /**
   * Called when the countdown reaches zero.
   * Switches mode, resets remaining time, shows a status message,
   * sets state to idle, and re-renders.
   *
   * Satisfies Requirements 3.8, 3.9, 3.10
   */
  _onComplete() {
    this._clearInterval();

    const statusEl = document.getElementById("timer-status");

    if (_mode === "session") {
      _mode      = "break";
      _remaining = 300; // 5 minutes
      if (statusEl) statusEl.textContent = "Session complete! Time for a break.";
    } else {
      _mode      = "session";
      _remaining = 1500; // 25 minutes
      if (statusEl) statusEl.textContent = "Break complete! Ready for the next session?";
    }

    _state = "idle";
    this._render();
  },

  /**
   * Decrements _remaining by 1 each tick.
   * Triggers _onComplete when the countdown reaches zero;
   * otherwise just re-renders.
   *
   * Satisfies Requirements 3.5, 3.8
   */
  _tick() {
    _remaining -= 1;
    if (_remaining <= 0) {
      this._onComplete();
    } else {
      this._render();
    }
  },

  /**
   * Starts the countdown.
   * Guard: only acts when state is "idle" or "paused".
   * Clears #timer-status, sets state to "running", and starts a 1-second interval.
   *
   * Satisfies Requirements 3.4, 3.5, 3.6
   */
  _start() {
    if (_state !== "idle" && _state !== "paused") return;

    _state = "running";

    const statusEl = document.getElementById("timer-status");
    if (statusEl) statusEl.textContent = "";

    _intervalId = setInterval(() => this._tick(), 1000);
    this._render();
  },

  /**
   * Pauses the countdown.
   * Guard: only acts when state is "running".
   *
   * Satisfies Requirements 3.6, 3.7
   */
  _stop() {
    if (_state !== "running") return;

    this._clearInterval();
    _state = "paused";
    this._render();
  },

  /**
   * Resets the timer to the default time for the current mode.
   * Clears any interval, resets state to idle, clears #timer-status, and re-renders.
   *
   * Satisfies Requirements 3.3, 3.11
   */
  _reset() {
    this._clearInterval();
    _state     = "idle";
    _remaining = _mode === "session" ? 1500 : 300;

    const statusEl = document.getElementById("timer-status");
    if (statusEl) statusEl.textContent = "";

    this._render();
  },

  /**
   * Bootstraps the TimerWidget:
   *  1. Sets initial state (idle, session, 1500 s).
   *  2. Calls _render() to populate the display immediately.
   *  3. Wires Start, Stop, and Reset buttons.
   *
   * Satisfies Requirements 3.1, 3.4, 3.6, 3.7, 3.11
   */
  init() {
    // Ensure clean initial state
    _state     = "idle";
    _mode      = "session";
    _remaining = 1500;

    this._render();

    const startBtn = document.getElementById("timer-start");
    const stopBtn  = document.getElementById("timer-stop");
    const resetBtn = document.getElementById("timer-reset");

    if (startBtn) startBtn.addEventListener("click", () => this._start());
    if (stopBtn)  stopBtn.addEventListener("click",  () => this._stop());
    if (resetBtn) resetBtn.addEventListener("click", () => this._reset());
  },
};

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// LinksWidget Module
// Handles quick-link add, delete, and LocalStorage sync.
// DOM targets: #link-name-input, #link-url-input, #link-add-btn,
//              #links-list, #link-name-warning, #link-url-warning
// Key: tld_links  Default: []
// Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const LinksWidget = {
  /** @type {Array<{id: number, name: string, url: string}>} */
  _links: [],

  /**
   * Reads quick-links from LocalStorage.
   *
   * @returns {Array<{id: number, name: string, url: string}>}
   *
   * Satisfies Requirement 4.8
   */
  _load() {
    return Storage.get("tld_links", []);
  },

  /**
   * Serialises the current links array to LocalStorage.
   *
   * Satisfies Requirement 4.7
   */
  _save() {
    Storage.set("tld_links", this._links);
  },

  /**
   * Attempts to add a new quick-link.
   * - If `name` is empty: adds `.input-error` to #link-name-input and shows #link-name-warning.
   * - If `url` is empty:  adds `.input-error` to #link-url-input  and shows #link-url-warning.
   * - Both checks run together so multiple errors are shown simultaneously.
   * - Returns without adding when any field is invalid.
   * - Otherwise pushes `{id, name, url}`, saves, and re-renders.
   *
   * @param {string} name
   * @param {string} url
   *
   * Satisfies Requirements 4.3, 4.4, 4.5
   */
  _addLink(name, url) {
    const nameInput   = document.getElementById("link-name-input");
    const urlInput    = document.getElementById("link-url-input");
    const nameWarning = document.getElementById("link-name-warning");
    const urlWarning  = document.getElementById("link-url-warning");

    let hasError = false;

    if (!name.trim()) {
      if (nameInput)   nameInput.classList.add("input-error");
      if (nameWarning) nameWarning.hidden = false;
      hasError = true;
    } else {
      if (nameInput)   nameInput.classList.remove("input-error");
      if (nameWarning) nameWarning.hidden = true;
    }

    if (!url.trim()) {
      if (urlInput)   urlInput.classList.add("input-error");
      if (urlWarning) urlWarning.hidden = false;
      hasError = true;
    } else {
      if (urlInput)   urlInput.classList.remove("input-error");
      if (urlWarning) urlWarning.hidden = true;
    }

    if (hasError) return;

    this._links.push({ id: _genId(), name: name.trim(), url: url.trim() });
    this._save();
    this._render();

    // Clear inputs after successful add
    if (nameInput) nameInput.value = "";
    if (urlInput)  urlInput.value  = "";
  },

  /**
   * Removes the quick-link with the given `id`, saves, and re-renders.
   *
   * @param {number} id
   *
   * Satisfies Requirement 4.6
   */
  _deleteLink(id) {
    this._links = this._links.filter((link) => link.id !== id);
    this._save();
    this._render();
  },

  /**
   * Clears #links-list and rebuilds one <li> per link containing:
   *  - an <a> that opens the URL in a new tab with rel="noopener noreferrer"
   *  - a Delete button
   *
   * Satisfies Requirements 4.1, 4.2
   */
  _render() {
    const listEl = document.getElementById("links-list");
    if (!listEl) return;

    listEl.innerHTML = "";

    for (const link of this._links) {
      const li = document.createElement("li");
      li.className = "link-item";

      // â”€â”€ Anchor â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
      const a = document.createElement("a");
      a.href             = link.url;
      a.textContent      = link.name;
      a.target           = "_blank";
      a.rel              = "noopener noreferrer";
      a.setAttribute("aria-label", `Open ${link.name}`);

      // â”€â”€ Delete button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className   = "link-delete-btn";
      deleteBtn.setAttribute("aria-label", `Delete link: ${link.name}`);
      deleteBtn.addEventListener("click", () => this._deleteLink(link.id));

      li.appendChild(a);
      li.appendChild(deleteBtn);
      listEl.appendChild(li);
    }
  },

  /**
   * Bootstraps the LinksWidget:
   *  1. Loads links from LocalStorage and renders them.
   *  2. Wires the Add button click to _addLink().
   *  3. Wires `input` event on both fields to clear `.input-error` and hide warnings.
   *
   * Satisfies Requirements 4.3, 4.4, 4.5, 4.7, 4.8
   */
  init() {
    this._links = this._load();
    this._render();

    const nameInput   = document.getElementById("link-name-input");
    const urlInput    = document.getElementById("link-url-input");
    const addBtn      = document.getElementById("link-add");
    const nameWarning = document.getElementById("link-name-warning");
    const urlWarning  = document.getElementById("link-url-warning");

    if (addBtn) {
      addBtn.addEventListener("click", () => {
        const name = nameInput ? nameInput.value : "";
        const url  = urlInput  ? urlInput.value  : "";
        this._addLink(name, url);
      });
    }

    // Clear error state as soon as the user starts correcting a field
    if (nameInput) {
      nameInput.addEventListener("input", () => {
        nameInput.classList.remove("input-error");
        if (nameWarning) nameWarning.hidden = true;
      });
    }

    if (urlInput) {
      urlInput.addEventListener("input", () => {
        urlInput.classList.remove("input-error");
        if (urlWarning) urlWarning.hidden = true;
      });
    }
  },
};

// =============================================================================
// App Entry Point
// Satisfies Requirements 5.6, 6.3, 7.1
// =============================================================================

/**
 * Initialises every widget and wires the global theme-toggle button.
 *
 * Called once the DOM is fully parsed.
 */
function init() {
  ThemeManager.init();
  GreetingWidget.init();
  TodoWidget.init();
  TimerWidget.init();
  LinksWidget.init();
  document.getElementById("theme-toggle").addEventListener("click", () => ThemeManager.toggle());
}

document.addEventListener("DOMContentLoaded", init);
