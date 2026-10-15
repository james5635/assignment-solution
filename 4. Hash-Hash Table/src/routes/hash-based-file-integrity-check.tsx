import { useState } from 'react';
import { HashTable } from '@/hash-table';

function generateFileHash(fileContent: string): string {
  let hash = 5381;
  for (let i = 0; i < fileContent.length; i++) {
    hash = (hash * 33 + fileContent.charCodeAt(i)) % 1000000007;
  }
  return hash.toString(36) + fileContent.length.toString(36);
}

export function HashBasedFileIntegrityCheck() {
  const [fileTable] = useState(() => new HashTable<string, string>());
  const [storedHashes, setStoredHashes] = useState<Record<string, string>>({});
  const [fileName, setFileName] = useState('report.txt');
  const [fileContent, setFileContent] = useState(
    'Hello, this is my report.'
  );
  const [message, setMessage] = useState('');

  function storeFileHash(fileName: string, fileContent: string): void {
    const hash = generateFileHash(fileContent);
    fileTable.set(fileName, hash);
    setStoredHashes((prev) => ({ ...prev, [fileName]: hash }));
  }

  function verifyFileIntegrity(fileName: string, fileContent: string): string {
    const stored = fileTable.get(fileName);
    if (stored === undefined) {
      setMessage('No stored hash for this file');
      return 'No stored hash for this file';
    }
    const result =
      stored === generateFileHash(fileContent)
        ? 'File is intact'
        : 'File has been modified';
    setMessage(result);
    return result;
  }

  return (
    <div className="px-10">
      <h1 className="text-2xl font-bold mb-4">
        Hash-Based File Integrity Check
      </h1>

      <input
        className="border rounded px-3 py-2 w-full max-w-md"
        placeholder="File name"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      />

      <textarea
        className="border rounded px-3 py-2 w-full max-w-md mt-2"
        rows={4}
        placeholder="File content"
        value={fileContent}
        onChange={(e) => setFileContent(e.target.value)}
      />

      <div className="flex gap-4 mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 font-bold text-white rounded py-2 px-4"
          onClick={() => storeFileHash(fileName, fileContent)}>
          Store File Hash
        </button>

        <button
          className="bg-green-500 hover:bg-green-700 font-bold text-white rounded py-2 px-4"
          onClick={() => verifyFileIntegrity(fileName, fileContent)}>
          Verify Integrity
        </button>
      </div>

      {storedHashes[fileName] && (
        <p className="mt-4">
          Stored hash: <strong>{storedHashes[fileName]}</strong>
        </p>
      )}

      {message && (
        <p className="mt-2">
          Result: <strong>{message}</strong>
        </p>
      )}
    </div>
  );
}
