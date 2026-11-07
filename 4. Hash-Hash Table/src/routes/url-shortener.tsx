import { useState } from 'react';
import { URLShortenerService } from '@/lib/url-shortener';

export function URLShortener() {
  const [shortener] = useState(() => new URLShortenerService());
  const [longURL, setLongURL] = useState('');
  const [shortURL, setShortURL] = useState<string | null>(null);
  const [retrieved, setRetrieved] = useState<string | null>(null);

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
          onClick={() => setShortURL(shortener.generateShortURL(longURL))}>
          Shorten
        </button>

        <button
          className="bg-green-500 hover:bg-green-700 font-bold text-white rounded py-2 px-4"
          onClick={() => setRetrieved(shortener.getOriginalURL(shortURL ?? ''))}>
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
