import { test, expect } from "bun:test";
import { BTree } from "./b-tree";

test("should correctly insert keys into the B-tree", () => {
  const tree = new BTree(2);
  [10, 20, 5, 6, 12, 30, 7, 17].forEach((k) => tree.insert(k));
  expect(tree.inorder()).toEqual([5, 6, 7, 10, 12, 17, 20, 30]);
});

test("should correctly delete keys from the B-tree", () => {
  const tree = new BTree(2);
  [10, 20, 5, 6, 12, 30, 7, 17].forEach((k) => tree.insert(k));
  tree.delete(6);
  tree.delete(12);
  tree.delete(10);
  expect(tree.inorder()).toEqual([5, 7, 17, 20, 30]);
});

test("should handle node splits and merges correctly", () => {
  const tree = new BTree(2);
  for (let i = 1; i <= 20; i++) tree.insert(i);
  for (let i = 1; i <= 15; i++) tree.delete(i);
  expect(tree.inorder()).toEqual([16, 17, 18, 19, 20]);
});

test("should maintain integrity after bulk insertions and deletions", () => {
  const tree = new BTree(3);
  const keys = Array.from({ length: 100 }, (_, i) => i + 1);
  keys.forEach((k) => tree.insert(k));
  expect(tree.inorder()).toEqual(keys);
  keys.slice(0, 70).forEach((k) => tree.delete(k));
  expect(tree.inorder()).toEqual(keys.slice(70));
});

test("should handle duplicate insertions and non-existent deletions gracefully", () => {
  const tree = new BTree(2);
  tree.insert(5);
  tree.insert(5);
  tree.delete(999);
  tree.delete(5);
  tree.delete(5);
  expect(tree.inorder()).toEqual([]);
  expect(tree.search(5)).toBe(false);
});
