import { useState } from 'react';
import { HashTable } from '@/hash-table';

function hashURL(longURL: string): string {
  let hash = 0;
  for (let i = 0; i < longURL.length; i++) {
    hash = (hash * 31 + longURL.charCodeAt(i)) % 1000000007;
  }
  return hash.toString(36);
}

export function URLShortener() {
  const [urlTable] = useState(() => new HashTable<string, string>());
  const [longURL, setLongURL] = useState('');
  const [shortURL, setShortURL] = useState<string | null>(null);
  const [retrieved, setRetrieved] = useState<string | null>(null);

  function generateShortURL(longURL: string): string {
    const baseShortURL = hashURL(longURL);

    const existing = urlTable.get(baseShortURL);
    if (existing === longURL) return baseShortURL;

    let candidate = baseShortURL;
    let counter = 1;

    while (
      urlTable.get(candidate) !== undefined &&
      urlTable.get(candidate) !== longURL
    ) {
      candidate = `${baseShortURL}-${counter}`;
      counter++;
    }

    urlTable.set(candidate, longURL);
    return candidate;
  }

  function getOriginalURL(shortURL: string): string | null {
    return urlTable.get(shortURL) ?? null;
  }

  return (
    <div className="px-10">
      <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>

      <input
        className="border rounded px-3 py-2 w-full max-w-md"
        placeholder="Enter a long URL"
        value={longURL}
        onChange={(e) => setLongURL(e.target.value)}
      />

      <div className="flex gap-4 mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 font-bold text-white rounded py-2 px-4"
          onClick={() => setShortURL(generateShortURL(longURL))}>
          Shorten
        </button>

        <button
          className="bg-green-500 hover:bg-green-700 font-bold text-white rounded py-2 px-4"
          onClick={() => setRetrieved(getOriginalURL(shortURL ?? ''))}>
          Retrieve Original
        </button>
      </div>

      {shortURL && (
        <p className="mt-4">
          Short URL: <strong>{shortURL}</strong>
        </p>
      )}

      {retrieved && (
        <p className="mt-2">
          Original URL: <strong>{retrieved}</strong>
        </p>
      )}
    </div>
  );
}
