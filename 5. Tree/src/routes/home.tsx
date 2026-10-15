import { Link } from "react-router";

export function Home() {
  return (
    <div className="px-10">
      <h1 className="text-2xl font-bold mb-4">Tree</h1>
      <Link to="/file-system-directory-tree" className="text-blue-500 underline block">
        File System Directory Tree
      </Link>
      <Link
        to="/html-dom-structure-management"
        className="text-blue-500 underline block"
      >
        HTML DOM Structure Management
      </Link>
      <Link to="/b-tree-implementation" className="text-blue-500 underline block">
        B-Tree Implementation
      </Link>
    </div>
  );
}
