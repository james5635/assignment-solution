import { create } from 'zustand'
import { HashTable } from '@/hash-table';

function hashURL(longURL: string): string {
  let hash = 0;
  for (let i = 0; i < longURL.length; i++) {
    hash = (hash * 31 + longURL.charCodeAt(i)) % 1000000007;
  }
  return hash.toString(36); // Convert to base-36 (alphanumeric)
}

const useURLShortener = create<{ urlTable: HashTable<string, string>, generateShortURL: any, getOriginalURL: any }>((set, get) => ({
  urlTable: new HashTable<string, string>,
  generateShortURL: (longURL: string) => {
    const { urlTable } = get();

    const baseShortURL = hashURL(longURL);

    // Same URL already exists
    if (urlTable.has(baseShortURL)) {
      if (urlTable.get(baseShortURL) === longURL) {
        return baseShortURL;
      }
    }

    let shortURL = baseShortURL;
    let counter = 1;

    // Handle collision
    while (
      urlTable.has(shortURL) &&
      urlTable.get(shortURL) !== longURL
    ) {
      shortURL = `${baseShortURL}-${counter}`;
      counter++;
    }

    // Create a new Map so Zustand detects the state change
    const newTable = new Map(urlTable);
    newTable.set(shortURL, longURL);

    set({ urlTable: newTable });

    return shortURL;
  },

  getOriginalURL: (shortURL: string) => {
    return get().urlTable.get(shortURL) ?? null;
  },
}));

export function URLShortener() {


  return <h1>About Page</h1>;
}