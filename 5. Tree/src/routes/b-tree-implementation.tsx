import { useState } from "react";
import { BTree } from "../b-tree";

export function BTreeImplementation() {
  const [tree] = useState(() => new BTree(2));
  const [keys, setKeys] = useState<number[]>([]);
  const [keyInput, setKeyInput] = useState("");
  const [message, setMessage] = useState("");

  const parseKey = (): number | null => {
    const key = Number(keyInput);
    return keyInput.trim() !== "" && !Number.isNaN(key) ? key : null;
  };

  return (
    <div className="px-10">
      <h1 className="text-2xl font-bold mb-4">B-Tree Implementation</h1>

      <input
        className="border rounded px-3 py-2 w-40"
        placeholder="Key (number)"
        value={keyInput}
        onChange={(e) => setKeyInput(e.target.value)}
      />

      <div className="flex gap-4 mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 font-bold text-white rounded py-2 px-4"
          onClick={() => {
            const key = parseKey();
            if (key === null) return setMessage("Invalid key");
            tree.insert(key);
            setKeys(tree.inorder());
            setMessage(`Inserted ${key}`);
          }}
        >
          Insert
        </button>

        <button
          className="bg-red-500 hover:bg-red-700 font-bold text-white rounded py-2 px-4"
          onClick={() => {
            const key = parseKey();
            if (key === null) return setMessage("Invalid key");
            tree.delete(key);
            setKeys(tree.inorder());
            setMessage(`Deleted ${key}`);
          }}
        >
          Delete
        </button>

        <button
          className="bg-green-500 hover:bg-green-700 font-bold text-white rounded py-2 px-4"
          onClick={() => {
            const key = parseKey();
            if (key === null) return setMessage("Invalid key");
            setMessage(tree.search(key) ? `${key} found` : `${key} not found`);
          }}
        >
          Search
        </button>
      </div>

      <p className="mt-4">
        Keys (in-order): <strong>{keys.join(", ") || "empty"}</strong>
      </p>
      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </div>
  );
}
