export class HashTable<K, V> {
  private buckets: Array<Array<[K, V]>>;
  private size: number;

  constructor(size: number = 50) {
    this.size = size;
    this.buckets = new Array(size);
  }

  private hash(key: K): number {
    const str = String(key);
    let hashValue = 0;
    for (let i = 0; i < str.length; i++) {
      hashValue = (hashValue * 31 + str.charCodeAt(i)) % this.size;
    }
    return Math.abs(hashValue);
  }

  public set(key: K, value: V): void {
    const index = this.hash(key);
    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }
    
    // Update if key already exists
    for (const entry of this.buckets[index]) {
      if (entry[0] === key) {
        entry[1] = value;
        return;
      }
    }
    
    this.buckets[index].push([key, value]);
  }

  public get(key: K): V | undefined {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    if (!bucket) return undefined;

    for (const entry of bucket) {
      if (entry[0] === key) {
        return entry[1];
      }
    }
    return undefined;
  }
}
