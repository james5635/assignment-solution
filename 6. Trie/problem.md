# 6. Trie

## Dictionary Implementation Using Trie (with React)

### 📌 Problem Statement

Implement a dictionary application using a **Trie data structure**. Your dictionary must support insertion of words, searching for words, and auto-completion functionality. The implementation must include a React-based UI.

---

### 🎯 Requirements

1. Implement the dictionary using a Trie data structure.
2. Support insertion of words into the Trie.
3. Enable efficient searching of words.
4. Implement auto-completion for prefixes.

---

### 🛠 Required Functions

```typescript
function insertWord(trie: Trie, word: string): void;
// - Inserts a word into the Trie.

function searchWord(trie: Trie, word: string): boolean;
// - Returns true if the word exists in the Trie.

function autoComplete(trie: Trie, prefix: string): string[];
// - Returns a list of words in the Trie that start with the given prefix.

```

---

### 📂 Trie Interface

```typescript
interface Trie {
  root: TrieNode;
}

interface TrieNode {
  children: { [key: string]: TrieNode };
  isEndOfWord: boolean;
}

```

---

### 🔥 React UI Integration Requirement

Implement a React component that:

* Provides an input field for users to enter words.
* Displays search results dynamically.
* Offers auto-completion suggestions as the user types.

```typescript
function DictionaryApp({ trie }: { trie: Trie }): JSX.Element;

```

This UI component must dynamically reflect insertions, searches, and auto-completion visually.