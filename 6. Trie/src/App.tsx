import { useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { DictionaryApp } from "./routes/dictionary";
import { Home } from "./routes/home";
import { createTrie, insertWord } from "./trie";
import "./index.css";

export function App() {
  const trie = useMemo(() => {
    const t = createTrie();
    ["app", "apple", "application", "banana", "band", "cat"].forEach((w) =>
      insertWord(t, w)
    );
    return t;
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dictionary" element={<DictionaryApp trie={trie} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
