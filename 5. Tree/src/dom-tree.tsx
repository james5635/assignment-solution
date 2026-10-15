import { type ReactElement, type RefObject } from "react";

export interface DomElement {
  id: string;
  tagName: string;
  parent: DomElement | null;
  children: DomElement[];
}

export interface DomTree {
  root: DomElement;
}

function toDomElement(el: HTMLElement, parent: DomElement | null): DomElement {
  const entry: DomElement = {
    id: el.id,
    tagName: el.tagName.toLowerCase(),
    parent,
    children: [],
  };
  entry.children = Array.from(el.children).map((child) =>
    toDomElement(child as HTMLElement, entry)
  );
  return entry;
}

export function buildDomTree(
  rootDivRef: RefObject<HTMLDivElement | null>
): DomTree {
  const rootEl = rootDivRef.current;
  if (!rootEl) throw new Error("Root div ref is not attached");
  return { root: toDomElement(rootEl, null) };
}

function findIn(element: DomElement, id: string): DomElement | null {
  if (element.id === id) return element;
  for (const child of element.children) {
    const found = findIn(child, id);
    if (found) return found;
  }
  return null;
}

export function findElementById(tree: DomTree, id: string): DomElement | null {
  return findIn(tree.root, id);
}

export function insertElement(tree: DomTree, element: DomElement): void {
  const parent = element.parent ?? tree.root;
  element.parent = parent;
  parent.children.push(element);
}

export function deleteElementById(tree: DomTree, id: string): void {
  const element = findElementById(tree, id);
  if (!element || !element.parent) return;
  element.parent.children = element.parent.children.filter((c) => c !== element);
  element.parent = null;
}

export function getSiblingElements(tree: DomTree, id: string): DomElement[] {
  const element = findElementById(tree, id);
  if (!element || !element.parent) return [];
  return element.parent.children.filter((c) => c !== element);
}

export function getSubTree(tree: DomTree, id: string): DomTree | null {
  const element = findElementById(tree, id);
  return element ? { root: element } : null;
}

export function DomTreeRenderer({ tree }: { tree: DomTree }): ReactElement {
  const renderElement = (el: DomElement): ReactElement => (
    <div key={el.id} className="border-l-2 border-gray-400 pl-2 my-1">
      <span className="font-mono text-sm">
        &lt;{el.tagName} id="{el.id}"&gt;
      </span>
      {el.children.map(renderElement)}
    </div>
  );
  return <div>{renderElement(tree.root)}</div>;
}
