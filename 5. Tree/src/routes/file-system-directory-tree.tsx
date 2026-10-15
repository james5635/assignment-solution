import { useState } from "react";
import {
  ROOT_PATH,
  buildFileSystemTree,
  deleteEntryByPath,
  findEntryByPath,
  insertEntry,
  resetFileSystem,
  type DirectoryTree,
  type FileSystemEntry,
} from "../file-system-tree";

export function FileSystemDirectoryTree() {
  const [tree, setTree] = useState<DirectoryTree>(() =>
    buildFileSystemTree(ROOT_PATH)
  );
  const [parentPath, setParentPath] = useState("/");
  const [entryName, setEntryName] = useState("");
  const [isDirectory, setIsDirectory] = useState(true);
  const [deletePath, setDeletePath] = useState("");
  const [findPath, setFindPath] = useState("");
  const [found, setFound] = useState<FileSystemEntry | null>(null);
  const [message, setMessage] = useState("");

  const sync = () => setTree(buildFileSystemTree(ROOT_PATH));

  const renderEntry = (entry: FileSystemEntry, depth: number): React.ReactElement => (
    <div key={entry.path} style={{ paddingLeft: depth * 20 }}>
      {entry.isDirectory ? "📁" : "📄"} {entry.path}
      {entry.children.map((child) => renderEntry(child, depth + 1))}
    </div>
  );

  return (
    <div className="px-10">
      <h1 className="text-2xl font-bold mb-4">File System Directory Tree</h1>

      <div className="font-mono text-sm border rounded p-3 max-w-2xl">
        {renderEntry(tree.root, 0)}
      </div>

      <div className="flex flex-wrap gap-2 mt-4 items-center">
        <input
          className="border rounded px-3 py-2 w-40"
          placeholder="Parent path (/)"
          value={parentPath}
          onChange={(e) => setParentPath(e.target.value)}
        />
        <input
          className="border rounded px-3 py-2 w-40"
          placeholder="Entry name"
          value={entryName}
          onChange={(e) => setEntryName(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2"
          value={isDirectory ? "dir" : "file"}
          onChange={(e) => setIsDirectory(e.target.value === "dir")}
        >
          <option value="dir">Directory</option>
          <option value="file">File</option>
        </select>
        <button
          className="bg-blue-500 hover:bg-blue-700 font-bold text-white rounded py-2 px-4"
          onClick={() => {
            try {
              insertEntry(tree, parentPath, entryName, isDirectory);
              sync();
              setMessage(`Inserted ${entryName}`);
            } catch (err) {
              setMessage((err as Error).message);
            }
          }}
        >
          Insert
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-2 items-center">
        <input
          className="border rounded px-3 py-2 w-40"
          placeholder="Path to delete"
          value={deletePath}
          onChange={(e) => setDeletePath(e.target.value)}
        />
        <button
          className="bg-red-500 hover:bg-red-700 font-bold text-white rounded py-2 px-4"
          onClick={() => {
            try {
              deleteEntryByPath(tree, deletePath);
              sync();
              setMessage(`Deleted ${deletePath}`);
            } catch (err) {
              setMessage((err as Error).message);
            }
          }}
        >
          Delete
        </button>

        <input
          className="border rounded px-3 py-2 w-40 ml-4"
          placeholder="Path to find"
          value={findPath}
          onChange={(e) => setFindPath(e.target.value)}
        />
        <button
          className="bg-green-500 hover:bg-green-700 font-bold text-white rounded py-2 px-4"
          onClick={() => setFound(findEntryByPath(tree, findPath))}
        >
          Find
        </button>

        <button
          className="bg-gray-500 hover:bg-gray-700 font-bold text-white rounded py-2 px-4 ml-4"
          onClick={() => {
            resetFileSystem();
            sync();
            setMessage("Filesystem reset");
          }}
        >
          Reset
        </button>
      </div>

      {found && (
        <p className="mt-3">
          Found: <strong>{found.path}</strong> (
          {found.isDirectory ? "directory" : "file"})
        </p>
      )}
      {message && <p className="mt-3 text-sm text-gray-600">{message}</p>}
    </div>
  );
}
