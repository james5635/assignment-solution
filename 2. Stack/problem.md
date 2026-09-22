# 2. Stack

## Undo/Redo Text Editor

### 📌 Problem Statement

Create a basic text editor where users can type text and use Undo (Ctrl+Z) and Redo (Ctrl+Y) functionality.

The solution should efficiently manage text history to support these operations.

### 🎯 Requirements

1. Users can type text into a text area, and each change should be recorded.
2. Users can undo (Ctrl+Z) their last text change.
3. Users can redo (Ctrl+Y) an undone change.
4. If a user types new text after undoing, the previous redo actions should no longer be available.
5. Implement this in a React functional component.

### 🛠 Required Function Signatures

```typescript
function handleInputChange(newText: string): void;
// - Stores the new text change in the history for future undo/redo operations.

function undo(): void;
// - Moves back to the previous recorded text state.

function redo(): void;
// - Moves forward to a previously undone text state if available.
```

### 💡 Additional Notes

* You may choose any approach to store and manage history as long as Undo and Redo work as expected.
* Consider efficiency when storing and retrieving text history.
* Ensure the solution properly handles edge cases, such as multiple consecutive undos or redoing after new input.

---

## Browser Navigation History (Back & Forward)

### 📌 Problem Statement

Implement a browser-like navigation system in React.

Users should be able to visit new pages and navigate backward and forward, just like in a web browser.

### 🎯 Requirements

1. Users can visit a new page (push to history stack).
2. Users can go back to the previous page.
3. Users can go forward to the next page.
4. If a user visits a new page after going back, clear the forward history.
5. Implement this in a React functional component.

### 🛠 Required Function Signatures

```typescript
function visitPage(url: string): void;
// - Adds a new page URL to the history stack.
// - Clears forward history if a new page is visited after going back.

function goBack(): string | null;
// - Moves back to the previous page in history.
// - Returns the new current page URL.

function goForward(): string | null;
// - Moves forward in history (if available).
// - Returns the new current page URL.

function getCurrentPage(): string | null;
// - Returns the URL of the current page.
```

---

## Nested Modal Stack

### 📌 Problem Statement

Implement a nested modal system in React.

Users can open multiple modals on top of each other, and the last opened modal must be closed first (LIFO behavior).

### 🎯 Requirements

1. Users can open a new modal (push to stack).
2. Users can close the last opened modal (pop from stack).
3. Display all currently open modals.
4. Implement this in a React functional component.

### 🛠 Required Function Signatures

```typescript
function openModal(modalId: string): void;
// - Pushes a new modal ID to the modal stack.

function closeModal(): void;
// - Removes the top modal from the modal stack.

function getOpenModals(): string[];
// - Returns a list of currently open modals.
```

---

## 💡 Notes for Implementation

* Use `useState` to manage the stack.
* Use buttons to trigger the `undo()`, `redo()`, `visitPage()`, `goBack()`, `goForward()`, `openModal()`, and `closeModal()` functions.
* Display the current state in each component (e.g., show the current text, page, or list of open modals).
* Ensure that the stack operations (push, pop) follow LIFO behavior.
