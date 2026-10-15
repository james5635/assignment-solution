# 5. Tree

## File System Directory Tree

### 📌 Problem Statement

You must implement a **file system directory tree** that manages actual physical directories. Your system should dynamically create and manage this structure based on existing files/directories in a real filesystem.

---

### 🎯 Requirements

1. Implement a function to **build a tree** by scanning an actual physical directory.
2. The created tree must follow a clear **Tree interface** structure.
3. All insertion and deletion operations must affect the **actual physical directory structure**.

### 🛠 Required Functions

```typescript
function buildFileSystemTree(rootPath: string): DirectoryTree;
// - Creates and returns a directory tree starting from the given physical root directory.

function findEntryByPath(tree: DirectoryTree, path: string): FileSystemEntry | null;
// - Finds a directory or file efficiently by path.

function insertEntry(tree: DirectoryTree, parentPath: string, entryName: string, isDirectory: boolean): void;
// - Inserts a new file or directory under the given parent path in the physical filesystem.

function deleteEntryByPath(tree: DirectoryTree, path: string): void;
// - Deletes the specified entry from the tree and the physical filesystem.

```

### 📂 DirectoryTree Interface

```typescript
interface DirectoryTree {
  root: FileSystemEntry;
}

interface FileSystemEntry {
  path: string;
  name: string;
  isDirectory: boolean;
  parent: FileSystemEntry | null;
  children: FileSystemEntry[];
}

```

---

## HTML DOM Structure Management (with React)

### 📌 Problem Statement

Implement a simplified **HTML DOM management system** using React. You must parse a given DOM structure starting from a specific `div` reference into a tree structure, allowing dynamic insertion, deletion, and search operations. All operations must directly modify the rendered React DOM.

### 🎯 Requirements

1. Parse initial DOM data from a given root `div` reference into a clear **Tree structure** and return it.
2. All operations should directly reflect changes in the actual React-rendered DOM.

### 🛠 Required Functions

```typescript
function buildDomTree(rootDivRef: React.RefObject<HTMLDivElement>): DomTree;
// - Parses DOM starting from a specific div ref into a tree and returns it.

function findElementById(tree: DomTree, id: string): DomElement | null;
// - Searches and returns an element by id.

function insertElement(tree: DomTree, element: DomElement): void;
// - Inserts a new element directly into the DOM tree. If no parent provided, insert under root.

function deleteElementById(tree: DomTree, id: string): void;
// - Deletes the specified element from the tree and actual DOM.

function getSiblingElements(tree: DomTree, id: string): DomElement[];
// - Returns sibling elements of the specified element.

function getSubTree(tree: DomTree, id: string): DomTree | null;
// - Returns the subtree rooted at the specified element.

```

### 📂 DomTree Interface

```typescript
interface DomTree {
  root: DomElement;
}

interface DomElement {
  id: string;
  tagName: string;
  parent: DomElement | null;
  children: DomElement[];
}

```

### 🔥 React Integration Requirement

Implement a React component to **visually render the DOM tree**:

```typescript
function DomTreeRenderer({ tree }: { tree: DomTree }): JSX.Element;

```

This component must dynamically reflect insertions, deletions, and other tree modifications visually.

---

## B-Tree Implementation with Test Code

### 📌 Problem Statement

Implement a **B-Tree** supporting insertion and deletion operations. Ensure the B-Tree maintains its balanced properties throughout these operations.

### 🎯 Requirements

1. Implement insertion and deletion methods for a B-Tree.
2. Maintain B-Tree properties correctly through operations.
3. **Write test cases** to verify your implementation's correctness. (The body of the test cases is not required, only clearly defined test signatures.)

### 🛠 Required Functions

```typescript
function insert(key: number): void;
// - Inserts a key into the B-Tree.

function delete(key: number): void;
// - Deletes a key from the B-Tree.

function search(key: number): boolean;
// - Searches the B-Tree and returns true if the key exists.

```

### 📂 B-Tree Interface

```typescript
interface BTree {
  insert(key: number): void;
  delete(key: number): void;
  search(key: number): boolean;
}

```

### ✅ Test Code Signatures

You must include test code signatures for the following cases:

* Basic insertion

```typescript
test('should correctly insert keys into the B-tree', () => {});

```

* Basic deletion

```typescript
test('should correctly delete keys from the B-tree', () => {});

```

* Node splitting and merging

```typescript
test('should handle node splits and merges correctly', () => {});

```

* Bulk insertions and deletions

```typescript
test('should maintain integrity after bulk insertions and deletions', () => {});

```

* Edge cases (duplicate insertions, non-existent deletions)

```typescript
test('should handle duplicate insertions and non-existent deletions gracefully', () => {});

```