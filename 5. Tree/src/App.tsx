import { BrowserRouter, Routes, Route } from "react-router";
import { FileSystemDirectoryTree } from "./routes/file-system-directory-tree";
import { HtmlDomStructureManagement } from "./routes/html-dom-structure-management";
import { BTreeImplementation } from "./routes/b-tree-implementation";
import { Home } from "./routes/home";
import "./index.css";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/file-system-directory-tree"
          element={<FileSystemDirectoryTree />}
        />
        <Route
          path="/html-dom-structure-management"
          element={<HtmlDomStructureManagement />}
        />
        <Route path="/b-tree-implementation" element={<BTreeImplementation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
