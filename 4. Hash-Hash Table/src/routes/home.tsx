import { Link } from "react-router"
export function Home() {
  return (
    <>
      <Link to="/url-shortener">URL Shortener</Link>
      <br />
      <Link to="/hash-based-file-integrity-check">Hash-Based File Integrity Check</Link>
    </>
  )
}