import { HashTable } from '@/hash-table';

export class URLShortenerService {
  private readonly urlTable = new HashTable<string, string>();

  private hashURL(longURL: string): string {
    let hash = 0;
    for (let i = 0; i < longURL.length; i++) {
      hash = (hash * 31 + longURL.charCodeAt(i)) % 1000000007;
    }
    return hash.toString(36);
  }

  public generateShortURL(longURL: string): string {
    const baseShortURL = this.hashURL(longURL);

    const existing = this.urlTable.get(baseShortURL);
    if (existing === longURL) return baseShortURL;

    let candidate = baseShortURL;
    let counter = 1;

    while (
      this.urlTable.get(candidate) !== undefined &&
      this.urlTable.get(candidate) !== longURL
    ) {
      candidate = `${baseShortURL}-${counter}`;
      counter++;
    }

    this.urlTable.set(candidate, longURL);
    return candidate;
  }

  public getOriginalURL(shortURL: string): string | null {
    return this.urlTable.get(shortURL) ?? null;
  }
}
