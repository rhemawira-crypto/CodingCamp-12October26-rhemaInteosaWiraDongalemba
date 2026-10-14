# Requirements Document

## Introduction

The To-Do List Life Dashboard is a standalone, client-side web page that serves as a personal productivity homepage. It presents four core widgets in a single-page layout: a Greeting/Clock widget (live date, time, and time-of-day greeting), a to-do list for task management, a Pomodoro-style focus timer that alternates between a 25-minute Session and a 5-minute Break, and a quick-links panel for bookmarked websites.

The Dashboard is built with one HTML file, one CSS file inside the css/ folder, and one JavaScript file inside the js/ folder — no framework, no backend server, and no build step. All user data is persisted in the browser's LocalStorage. The Dashboard must work by opening the HTML file in any modern browser, or after being published via GitHub Pages.

The Dashboard also implements three optional challenges from the assignment brief:
(1) Light/Dark mode toggle, (2) Custom user name in the greeting, and (3) Duplicate task prevention.

The Dashboard must work by opening the HTML file in any modern browser (Chrome, Firefox, Edge, Safari), or after being published via GitHub Pages.

## Glossary

- **Dashboard**: The single HTML page that hosts all four widgets.
- **Clock_Widget**: The widget that displays the current date and time, updated every second.
- **Todo_Widget**: The widget that manages a list of tasks the user can add, complete, and delete.
- **Task**: A single to-do item consisting of text content and a completion state.
- **Timer_Widget**: The Pomodoro-style countdown timer widget.
- **Session**: A single Pomodoro work interval (default 25 minutes).
- **Break**: A short rest interval following a completed Session (default 5 minutes).
- **Timer_State**: One of three states the Timer_Widget can be in: `idle`, `running`, or `paused`.
- **Links_Widget**: The widget that displays a collection of user-defined quick-access URLs.
- **Quick_Link**: A user-defined entry consisting of a label and a URL.
- **LocalStorage**: The browser's built-in key-value storage API used for all data persistence.
- **Dashboard_State**: The combined persisted state of all widgets stored in LocalStorage.
- **Greeting_Widget**: The widget that displays the current date, current time, and a time-of-day greeting message. Optionally includes the user's saved name.

- **Greeting**: A contextual message shown based on the current hour: "Good Morning" (00:00–11:59), "Good Afternoon" (12:00–17:59), "Good Evening" (18:00–23:59).

- **Theme**: The active visual color scheme of the Dashboard, either "light" or "dark". Persisted in LocalStorage.

- **Edit_Task**: The action of modifying the text content of an existing Task without changing its completion state.

- **Duplicate_Task**: A Task whose text matches (case-insensitively, after trimming) the text of an existing Task in the same Todo_Widget list.
---

## Requirements

### Requirement 1: Live Clock Display

**User Story:** As a user, I want to see the current date and time on the dashboard, so that I always know the time without leaving my browser homepage.

#### Acceptance Criteria

1. THE Clock_Widget SHALL display the current time in HH:MM:SS format.
2. THE Clock_Widget SHALL display the current date in a human-readable format (e.g., "Monday, October 14, 2026").
3. WHEN the Dashboard loads, THE Clock_Widget SHALL begin updating the displayed time every 1 second.
4. WHILE the Dashboard page is open, THE Clock_Widget SHALL continue updating without requiring user interaction.
5. THE Clock_Widget SHALL display a greeting message that depends on the current hour: "Good Morning" (00:00–11:59), "Good Afternoon" (12:00–17:59), "Good Evening" (18:00–23:59).

6. WHERE a custom user name has been saved, THE Clock_Widget SHALL append the name to the greeting (e.g., "Good Morning, Rhema").

7. THE Clock_Widget SHALL provide an input field and a save control allowing the user to set or update the custom name.

8. THE Clock_Widget SHALL persist the custom name in LocalStorage and SHALL restore it when the Dashboard loads.
---

### Requirement 2: To-Do List Management

**User Story:** As a user, I want to manage a list of tasks on the dashboard, so that I can track what I need to accomplish during the day.

#### Acceptance Criteria

1. THE Todo_Widget SHALL display a text input field and an "Add" button for creating new Tasks.
2. WHEN the user enters text in the input field and activates the Add button, THE Todo_Widget SHALL add a new Task with the entered text and an incomplete state to the task list.
3. WHEN the user activates the Add button with an empty input field, THE Todo_Widget SHALL not add a Task and SHALL keep the input field focused.
4. WHEN the user presses the Enter key while the task input field is focused, THE Todo_Widget SHALL add the Task, equivalent to activating the Add button.
5. WHEN the user activates the completion toggle on a Task, THE Todo_Widget SHALL update that Task's state to completed and SHALL apply a visual strikethrough style to the Task text.
6. WHEN the user activates the completion toggle on a completed Task, THE Todo_Widget SHALL update that Task's state to incomplete and SHALL remove the strikethrough style.
7. WHEN the user activates the delete control on a Task, THE Todo_Widget SHALL remove that Task from the task list.
8. THE Todo_Widget SHALL persist all Tasks and their completion states to LocalStorage after every add, delete, or state-change operation.
9. WHEN the Dashboard loads, THE Todo_Widget SHALL restore all Tasks and their completion states from LocalStorage. IF LocalStorage contains Tasks with duplicate text values (case-insensitive, trimmed), THE Todo_Widget SHALL deduplicate them during restoration, retaining only one instance of each matching text (the first occurrence in the stored array).
10. THE Todo_Widget SHALL provide an Edit control on every Task.

11. WHEN the user activates the Edit control, THE Todo_Widget SHALL prompt the user to enter new text for that Task.

12. WHEN the user confirms the prompt with non-empty text, THE Todo_Widget SHALL update the Task text and SHALL preserve the Task's completion state.

13. WHEN the user confirms the prompt with empty text or cancels the prompt, THE Todo_Widget SHALL leave the Task unchanged.

14. WHEN the user attempts to add a Task whose text matches an existing Task (case-insensitive, trimmed), THE Todo_Widget SHALL NOT add the Task and SHALL display a visual warning message.

15. WHEN the user attempts to edit a Task such that its new text matches another Task (case-insensitive, trimmed), THE Todo_Widget SHALL NOT apply the change and SHALL display a visual warning message.
---

### Requirement 3: Pomodoro Focus Timer

**User Story:** As a user, I want a Pomodoro-style countdown timer that alternates between a 25-minute focus Session and a 5-minute Break, so that I can structure my work into focused intervals with rest periods.

#### Acceptance Criteria

1. THE Timer_Widget SHALL display a countdown in MM:SS format.

2. THE Timer_Widget SHALL display a mode label whose value SHALL always equal the current mode value — "Session" when the timer is in Session mode, and "Break" when the timer is in Break mode. The label SHALL update immediately whenever the mode changes.

3. WHEN the Dashboard loads, THE Timer_Widget SHALL initialize in the idle Timer_State, in Session mode, with the countdown set to 25:00.

4. WHEN the user activates the Start control while in the idle or paused state, THE Timer_Widget SHALL transition to the running state and SHALL count down by 1 second each second.

5. WHEN the user activates the Stop control, THE Timer_Widget SHALL check the current Timer_State at the moment of activation: IF the Timer_State is running, THEN THE Timer_Widget SHALL transition to the paused state and SHALL stop the countdown; otherwise the activation SHALL have no effect.

6. WHEN the user activates the Reset control, THE Timer_Widget SHALL transition to the idle state and SHALL reset the countdown to the current mode's default duration (25:00 in Session, 05:00 in Break).

7. When the countdown reaches 00:00 while in Session mode, THE Timer_Widget SHALL:

    stop the countdown,

    switch to Break mode with the countdown set to 05:00,

    transition to the idle state,

    and display a visual alert message inside the timer widget (e.g., "Session complete! Time for a break.").

    No audible alert is required.

8. WHEN the countdown reaches 00:00 while in Break mode, THE Timer_Widget SHALL: stop the countdown, switch back to Session mode with the countdown reset to 25:00, transition to the idle state (the new Session countdown SHALL NOT start automatically — the user must explicitly activate Start), and display a visual alert message inside the timer widget (e.g., "Break complete! Ready for the next session?").

9. THE Timer_Widget SHALL use exactly three control buttons: Start, Stop, and Reset.

10. THE Timer_Widget SHALL NOT provide custom Session or Break duration inputs. Both durations are fixed at 25 and 5 minutes respectively

11. No audible alert is required.

---

### Requirement 4: Quick Links Panel

**User Story:** As a user, I want to save and display quick-access links on the dashboard, so that I can navigate to my frequently visited websites with a single click.

#### Acceptance Criteria

1. THE Links_Widget SHALL display all saved Quick_Links as clickable elements.
2. WHEN the user activates a Quick_Link, THE Links_Widget SHALL open the associated URL in a new browser tab.
3. THE Links_Widget SHALL provide an input form allowing the user to enter a label and a URL to add a new Quick_Link.
4. WHEN the user submits the Quick_Link form with a non-empty label and a non-empty URL, THE Links_Widget SHALL add the new Quick_Link to the displayed list.
5. WHEN the user submits the Quick_Link form with an empty label or an empty URL (or both), THE Links_Widget SHALL not add the Quick_Link and SHALL simultaneously indicate all fields that are missing — if both label and URL are empty, both field indicators SHALL be shown at the same time.
6. WHEN the user activates the delete control on a Quick_Link, THE Links_Widget SHALL remove that Quick_Link from the list.
7. THE Links_Widget SHALL persist all Quick_Links to LocalStorage after every add or delete operation.
8. WHEN the Dashboard loads, THE Links_Widget SHALL restore all Quick_Links from LocalStorage.

---

### Requirement 5: Responsive Layout and Visual Design

**User Story:** As a user, I want the dashboard to look clean and work well on different screen sizes, so that I can use it comfortably on both desktop and laptop displays.

#### Acceptance Criteria

1. THE Dashboard SHALL arrange the four widgets in a grid layout that adapts to the available viewport width.
2. WHEN the viewport width is 768px or wider, THE Dashboard SHALL display widgets in a multi-column grid (at least 2 columns).
3. WHEN the viewport width is less than 768px, THE Dashboard SHALL display widgets in a single-column layout.
4. THE Dashboard SHALL apply a consistent typographic scale using a readable sans-serif font throughout all widgets.
5. THE Dashboard SHALL maintain sufficient color contrast between text and background to satisfy WCAG AA contrast ratios.
6. THE Dashboard SHALL render correctly without a server and without any external network requests (no CDN, no Google Fonts, no external images). All CSS loads from css/style.css and all JavaScript loads from js/script.js.

---

### Requirement 6: Data Persistence and Recovery

**User Story:** As a user, I want my tasks, timer settings, and quick links to be saved automatically, so that my dashboard state is restored when I reopen the page.

#### Acceptance Criteria

1. THE Dashboard SHALL store all persistent data in LocalStorage under the following namespaced keys:

    tld_tasks — array of Task objects { text, done }

    tld_links — array of Quick_Link objects { name, url }

    tld_theme — string, either "light" or "dark"

    tld_name — string, the user's custom 

2. THE Dashboard SHALL provide a single safe JSON parsing helper so that corrupt data in any key does not crash the Dashboard.

3. WHEN the Dashboard loads and LocalStorage contains no saved data, THE Dashboard SHALL initialize all widgets with sensible default values.

4. IF LocalStorage data for a widget is found to be corrupt or unparseable, THEN THE Dashboard SHALL discard that widget's stored data and initialize the widget with its default values without throwing an unhandled error.

5. THE Dashboard SHALL not require any user account, login, or network connection to operate.

### Requirement 7: Light/Dark Mode

**User Story:** As a user, I want to switch between light and dark themes, so that I can use the dashboard comfortably in different lighting conditions.

#### Acceptance Criteria

1. THE Dashboard SHALL provide a toggle control for switching between light and dark themes.

2. WHEN the user activates the toggle, THE Dashboard SHALL switch the active Theme and SHALL apply the new color scheme to all widgets immediately.

3. THE Dashboard SHALL persist the active Theme in LocalStorage.

4. WHEN the Dashboard loads, THE Dashboard SHALL restore the last active Theme from LocalStorage. If no Theme is stored, THE Dashboard SHALL default to light.

5. BOTH themes SHALL maintain sufficient color contrast between text and background to satisfy WCAG AA contrast ratios.


### Requirement 8: Project Structure & Deployment

**User Story:** As a participant of the Coding Camp, I want my Dashboard source code organized in a clean repository structure and published online via GitHub Pages, so that reviewers can inspect my code and access a live, working version of my project for grading and certification.

#### Acceptance Criteria

1. THE repository SHALL follow the naming format CodingCamp-[ddmmmyy]-[participantname], i.e. CodingCamp-12October26-rhemaInteosaWiraDongalemba.

2. THE repository SHALL contain exactly one CSS file inside the css/ folder.

3. THE repository SHALL contain exactly one JavaScript file inside the js/ folder.

4. THE repository SHALL include the .kiro/ folder generated by Kiro, committed alongside the source code.

5. THE repository SHALL include a README.md describing the project and how to run it.

6. THE Dashboard SHALL be published using GitHub Pages and SHALL be accessible via a public URL.

7. THE source code SHALL be pushed to GitHub using GitHub Desktop.

8 THE final submission SHALL include the AWS Builder ID, the GitHub repository URL, and the GitHub Pages URL, submitted through the Paperform link provided by the instructor.
