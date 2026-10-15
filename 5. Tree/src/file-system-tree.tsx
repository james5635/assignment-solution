export interface FileSystemEntry {
  path: string;
  name: string;
  isDirectory: boolean;
  parent: FileSystemEntry | null;
  children: FileSystemEntry[];
}

export interface DirectoryTree {
  root: FileSystemEntry;
}

interface PhysicalNode {
  isDirectory: boolean;
  children: Set<string>;
}

export const ROOT_PATH = "/";

// Simulated "physical" filesystem (a browser cannot touch the real one)
const physicalFS = new Map<string, PhysicalNode>();

export function resetFileSystem(): void {
  physicalFS.clear();
  physicalFS.set("/", {
    isDirectory: true,
    children: new Set(["/src", "/docs"]),
  });
  physicalFS.set("/src", {
    isDirectory: true,
    children: new Set(["/src/index.ts", "/src/logo.svg"]),
  });
  physicalFS.set("/src/index.ts", { isDirectory: false, children: new Set() });
  physicalFS.set("/src/logo.svg", { isDirectory: false, children: new Set() });
  physicalFS.set("/docs", {
    isDirectory: true,
    children: new Set(["/docs/readme.md"]),
  });
  physicalFS.set("/docs/readme.md", {
    isDirectory: false,
    children: new Set(),
  });
}

resetFileSystem();

function normalizePath(path: string): string {
  const parts = path.trim().split("/").filter(Boolean);
  return parts.length === 0 ? ROOT_PATH : `/${parts.join("/")}`;
}

function parentPathOf(path: string): string {
  const idx = path.lastIndexOf("/");
  return idx <= 0 ? ROOT_PATH : path.substring(0, idx);
}

export function buildFileSystemTree(rootPath: string): DirectoryTree {
  const build = (
    path: string,
    parent: FileSystemEntry | null
  ): FileSystemEntry => {
    const node = physicalFS.get(path)!;
    const entry: FileSystemEntry = {
      path,
      name: path === ROOT_PATH ? ROOT_PATH : path.split("/").pop()!,
      isDirectory: node.isDirectory,
      parent,
      children: [],
    };
    entry.children = [...node.children]
      .sort()
      .map((child) => build(child, entry));
    return entry;
  };
  return { root: build(normalizePath(rootPath), null) };
}

export function findEntryByPath(
  tree: DirectoryTree,
  path: string
): FileSystemEntry | null {
  const normalized = normalizePath(path);
  if (normalized === tree.root.path) return tree.root;
  const parts = normalized.split("/").filter(Boolean);
  let current = tree.root;
  for (const part of parts) {
    const next = current.children.find((child) => child.name === part);
    if (!next) return null;
    current = next;
  }
  return current;
}

export function insertEntry(
  tree: DirectoryTree,
  parentPath: string,
  entryName: string,
  isDirectory: boolean
): void {
  const cleanName = entryName.trim();
  if (cleanName === "" || cleanName.includes("/")) {
    throw new Error("Entry name must be non-empty and contain no '/'");
  }

  const normalizedParent = normalizePath(parentPath);
  const parentPhysical = physicalFS.get(normalizedParent);
  if (!parentPhysical || !parentPhysical.isDirectory) {
    throw new Error(`Parent directory not found: ${normalizedParent}`);
  }

  const newPath = `${
    normalizedParent === ROOT_PATH ? "" : normalizedParent
  }/${cleanName}`;
  if (physicalFS.has(newPath)) {
    throw new Error(`Entry already exists: ${newPath}`);
  }

  physicalFS.set(newPath, { isDirectory, children: new Set() });
  parentPhysical.children.add(newPath);

  const parentEntry = findEntryByPath(tree, normalizedParent);
  if (parentEntry) {
    parentEntry.children.push({
      path: newPath,
      name: cleanName,
      isDirectory,
      parent: parentEntry,
      children: [],
    });
  }
}

export function deleteEntryByPath(tree: DirectoryTree, path: string): void {
  const normalized = normalizePath(path);
  if (normalized === ROOT_PATH) {
    throw new Error("Cannot delete the root directory");
  }
  const entry = findEntryByPath(tree, normalized);
  if (!entry) {
    throw new Error(`Entry not found: ${normalized}`);
  }

  const remove = (p: string): void => {
    const node = physicalFS.get(p);
    if (!node) return;
    node.children.forEach(remove);
    physicalFS.delete(p);
  };
  remove(normalized);

  const parentPhysical = physicalFS.get(parentPathOf(normalized));
  if (parentPhysical) {
    parentPhysical.children.delete(normalized);
  }

  if (entry.parent) {
    entry.parent.children = entry.parent.children.filter((c) => c !== entry);
    entry.parent = null;
  }
}
