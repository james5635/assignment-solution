import { BrowserRouter, Routes, Route, Link } from 'react-router';
import { URLShortener } from './routes/url-shortener';
import { HashBasedFileIntegrityCheck } from './routes/hash-based-file-integrity-check';
import { Home } from './routes/home';
export function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/url-shortener" element={<URLShortener />} />
          <Route path="/hash-based-file-integrity-check" element={<HashBasedFileIntegrityCheck />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
