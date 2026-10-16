import { useState } from "react";
import { autoComplete, insertWord, searchWord, type Trie } from "../trie";

export function DictionaryApp({ trie }: { trie: Trie }) {
  const [wordInput, setWordInput] = useState("");
  const [message, setMessage] = useState("");

  const word = wordInput.trim().toLowerCase();
  const suggestions = autoComplete(trie, word);

  return (
    <div className="px-10">
      <h1 className="text-2xl font-bold mb-4">Dictionary (Trie)</h1>

      <input
        className="border rounded px-3 py-2 w-64"
        placeholder="Type a word..."
        value={wordInput}
        onChange={(e) => setWordInput(e.target.value)}
      />

      <div className="flex gap-4 mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 font-bold text-white rounded py-2 px-4"
          onClick={() => {
            if (word === "") return setMessage("Enter a word first");
            insertWord(trie, word);
            setMessage(`Inserted "${word}"`);
          }}
        >
          Insert
        </button>

        <button
          className="bg-green-500 hover:bg-green-700 font-bold text-white rounded py-2 px-4"
          onClick={() => {
            if (word === "") return setMessage("Enter a word first");
            setMessage(
              searchWord(trie, word) ? `"${word}" found` : `"${word}" not found`
            );
          }}
        >
          Search
        </button>
      </div>

      {suggestions.length > 0 && (
        <div className="mt-4">
          <p className="font-bold">Suggestions:</p>
          <ul className="list-disc ml-6">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion}
                className="cursor-pointer text-blue-500 hover:underline"
                onClick={() => setWordInput(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}

      {message && <p className="mt-3 text-sm text-gray-600">{message}</p>}
    </div>
  );
}
