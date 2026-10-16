export interface TrieNode {
  children: { [key: string]: TrieNode };
  isEndOfWord: boolean;
}

export interface Trie {
  root: TrieNode;
}

export function createTrie(): Trie {
  return { root: { children: {}, isEndOfWord: false } };
}

export function insertWord(trie: Trie, word: string): void {
  let node = trie.root;
  for (const char of word) {
    if (!node.children[char]) {
      node.children[char] = { children: {}, isEndOfWord: false };
    }
    node = node.children[char]!;
  }
  node.isEndOfWord = true;
}

export function searchWord(trie: Trie, word: string): boolean {
  const node = findNode(trie.root, word);
  return node !== null && node.isEndOfWord;
}

export function autoComplete(trie: Trie, prefix: string): string[] {
  const node = findNode(trie.root, prefix);
  if (!node) return [];
  const results: string[] = [];
  collectWords(node, prefix, results);
  return results;
}

function findNode(root: TrieNode, prefix: string): TrieNode | null {
  let node: TrieNode | undefined = root;
  for (const char of prefix) {
    node = node.children[char];
    if (!node) return null;
  }
  return node;
}

function collectWords(
  node: TrieNode,
  prefix: string,
  results: string[]
): void {
  if (node.isEndOfWord) results.push(prefix);
  for (const char of Object.keys(node.children).sort()) {
    collectWords(node.children[char]!, prefix + char, results);
  }
}
