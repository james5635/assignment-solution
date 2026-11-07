import { useState } from 'react';
import { FileIntegrityChecker } from '@/lib/file-integrity-checker';

export function HashBasedFileIntegrityCheck() {
  const [checker] = useState(() => new FileIntegrityChecker());
  const [storedHashes, setStoredHashes] = useState<Record<string, string>>({});
  const [fileName, setFileName] = useState('report.txt');
  const [fileContent, setFileContent] = useState(
    'Hello, this is my report.'
  );
  const [message, setMessage] = useState('');

  function handleStoreFileHash() {
    const hash = checker.storeFileHash(fileName, fileContent);
    setStoredHashes((prev) => ({ ...prev, [fileName]: hash }));
  }

  function handleVerifyFileIntegrity() {
    setMessage(checker.verifyFileIntegrity(fileName, fileContent));
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
          onClick={handleStoreFileHash}>
          Store File Hash
        </button>

        <button
          className="bg-green-500 hover:bg-green-700 font-bold text-white rounded py-2 px-4"
          onClick={handleVerifyFileIntegrity}>
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
