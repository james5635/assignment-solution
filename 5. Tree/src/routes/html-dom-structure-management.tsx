import { useEffect, useRef, useState } from "react";
import {
  DomTreeRenderer,
  buildDomTree,
  deleteElementById,
  findElementById,
  getSiblingElements,
  getSubTree,
  insertElement,
  type DomElement,
  type DomTree,
} from "../dom-tree";

let nextId = 100;

export function HtmlDomStructureManagement() {
  const rootDivRef = useRef<HTMLDivElement>(null);
  const [tree, setTree] = useState<DomTree | null>(null);
  const [newId, setNewId] = useState("");
  const [newTag, setNewTag] = useState("div");
  const [parentId, setParentId] = useState("app");
  const [deleteId, setDeleteId] = useState("");
  const [findId, setFindId] = useState("");
  const [found, setFound] = useState<DomElement | null>(null);
  const [siblings, setSiblings] = useState<DomElement[]>([]);
  const [subTree, setSubTree] = useState<DomTree | null>(null);

  useEffect(() => {
    if (rootDivRef.current) setTree(buildDomTree(rootDivRef));
  }, []);

  const sync = (t: DomTree) => setTree({ root: { ...t.root } });

  return (
    <div className="px-10">
      <h1 className="text-2xl font-bold mb-4">HTML DOM Structure Management</h1>

      <div ref={rootDivRef} className="border rounded p-3 mb-4 max-w-2xl">
        <div id="app" className="p-2">
          <div id="header" className="font-bold">Header</div>
          <div id="main" className="p-2">
            <p id="intro">Intro paragraph</p>
            <button id="cta">Click me</button>
          </div>
          <div id="footer">Footer</div>
        </div>
      </div>

      {tree && (
        <>
          <h2 className="font-bold mb-2">Parsed DOM Tree</h2>
          <DomTreeRenderer tree={tree} />

          <div className="flex flex-wrap gap-2 mt-4 items-center">
            <input
              className="border rounded px-3 py-2 w-28"
              placeholder="id"
              value={newId}
              onChange={(e) => setNewId(e.target.value)}
            />
            <input
              className="border rounded px-3 py-2 w-28"
              placeholder="tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
            <input
              className="border rounded px-3 py-2 w-28"
              placeholder="parent id"
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 font-bold text-white rounded py-2 px-4"
              onClick={() => {
                insertElement(tree, {
                  id: newId || `el-${nextId++}`,
                  tagName: newTag,
                  parent: findElementById(tree, parentId),
                  children: [],
                });
                sync(tree);
              }}
            >
              Insert
            </button>

            <input
              className="border rounded px-3 py-2 w-28 ml-4"
              placeholder="id to delete"
              value={deleteId}
              onChange={(e) => setDeleteId(e.target.value)}
            />
            <button
              className="bg-red-500 hover:bg-red-700 font-bold text-white rounded py-2 px-4"
              onClick={() => {
                deleteElementById(tree, deleteId);
                sync(tree);
              }}
            >
              Delete
            </button>
          </div>

          <div className="flex gap-2 mt-2 items-center">
            <input
              className="border rounded px-3 py-2 w-28"
              placeholder="find id"
              value={findId}
              onChange={(e) => setFindId(e.target.value)}
            />
            <button
              className="bg-green-500 hover:bg-green-700 font-bold text-white rounded py-2 px-4"
              onClick={() => {
                const el = findElementById(tree, findId);
                setFound(el);
                setSiblings(getSiblingElements(tree, findId));
                setSubTree(getSubTree(tree, findId));
              }}
            >
              Find
            </button>
          </div>

          {found && (
            <div className="mt-3 text-sm">
              <p>
                Found: <strong>&lt;{found.tagName} id="{found.id}"&gt;</strong>
              </p>
              <p>
                Siblings:{" "}
                {siblings.length
                  ? siblings.map((s) => s.id).join(", ")
                  : "none"}
              </p>
              {subTree && (
                <div className="mt-2">
                  <p className="font-bold">Subtree:</p>
                  <DomTreeRenderer tree={subTree} />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
