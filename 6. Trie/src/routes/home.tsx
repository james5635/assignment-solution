import { Link } from "react-router";

export function Home() {
  return (
    <div className="px-10">
      <h1 className="text-2xl font-bold mb-4">Trie</h1>
      <Link to="/dictionary" className="text-blue-500 underline block">
        Dictionary Implementation Using Trie
      </Link>
    </div>
  );
}
