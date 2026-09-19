'use client'
import { useState } from "react";

/**
 * Node in the doubly linked list that tracks recency order.
 * The head of the list is the most recently used entry.
 */
class CacheNode {
  key: string;
  value: string;
  prev: CacheNode | null = null;
  next: CacheNode | null = null;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }
}

/**
 * A small HashMap implemented from scratch (the problem forbids the
 * built-in `Map`/`Set`). Keys are hashed into an array of buckets and
 * collisions are handled with chaining (per-bucket arrays).
 */
class HashMap {
  private buckets: Array<Array<{ key: string; value: CacheNode }>>;
  private count = 0;

  constructor(capacity = 16) {
    this.buckets = Array.from({ length: capacity }, () => []);
  }

  private bucketIndex(key: string): number {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
    }
    return hash % this.buckets.length;
  }

  get(key: string): CacheNode | undefined {
    const bucket = this.buckets[this.bucketIndex(key)];
    const entry = bucket.find((e) => e.key === key);
    return entry ? entry.value : undefined;
  }

  set(key: string, value: CacheNode): void {
    const bucket = this.buckets[this.bucketIndex(key)];
    const entry = bucket.find((e) => e.key === key);
    if (entry) {
      entry.value = value;
      return;
    }
    bucket.push({ key, value });
    this.count++;
  }

  remove(key: string): void {
    const index = this.bucketIndex(key);
    const bucket = this.buckets[index];
    const entryIndex = bucket.findIndex((e) => e.key === key);
    if (entryIndex !== -1) {
      bucket.splice(entryIndex, 1);
      this.count--;
    }
  }
}

interface LRUCache {
  get(key: string): string | null
  put(key: string, value: string): void
  size(): number
  getLastEvictedKey(): string | null
  getOrder(): { key: string; value: string }[]
}

/**
 * LRU cache for API responses backed by a doubly linked list (recency
 * order) plus a HashMap (O(1) lookup by key).
 */
class LinkedListHashMapLRUCache implements LRUCache {
  private capacity: number;
  private map: HashMap;
  private head: CacheNode | null = null; // most recently used
  private tail: CacheNode | null = null; // least recently used
  private count = 0;
  private lastEvictedKey: string | null = null;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.map = new HashMap();
  }

  /**
   * Retrieves a value and marks the key as most recently used.
   */
  get(key: string): string | null {
    const node = this.map.get(key);
    if (!node) return null;

    this.moveToFront(node);
    return node.value;
  }

  /**
   * Stores a key-value pair, evicting the least recently used item
   * when the cache is full.
   */
  put(key: string, value: string): void {
    const existing = this.map.get(key);
    if (existing) {
      existing.value = value;
      this.moveToFront(existing);
      return;
    }

    if (this.count >= this.capacity) {
      this.evict();
    }

    const node = new CacheNode(key, value);
    this.addToFront(node);
    this.map.set(key, node);
    this.count++;
  }

  /**
   * Returns the current size of the cache.
   */
  size(): number {
    return this.count;
  }

  /**
   * Returns the key of the most recently evicted item (if any) and resets it.
   */
  getLastEvictedKey(): string | null {
    const key = this.lastEvictedKey;
    this.lastEvictedKey = null;
    return key;
  }

  /**
   * Traverses the list from most recent to least recent for rendering.
   */
  getOrder(): { key: string; value: string }[] {
    const order: { key: string; value: string }[] = [];
    let node = this.head;
    while (node) {
      order.push({ key: node.key, value: node.value });
      node = node.next;
    }
    return order;
  }

  private addToFront(node: CacheNode): void {
    node.prev = null;
    node.next = this.head;
    if (this.head) this.head.prev = node;
    this.head = node;
    if (!this.tail) this.tail = node;
  }

  private removeNode(node: CacheNode): void {
    if (node.prev) node.prev.next = node.next;
    else this.head = node.next;
    if (node.next) node.next.prev = node.prev;
    else this.tail = node.prev;
  }

  private moveToFront(node: CacheNode): void {
    if (node === this.head) return;
    this.removeNode(node);
    this.addToFront(node);
  }

  private evict(): void {
    if (!this.tail) return;
    const lru = this.tail;
    this.lastEvictedKey = lru.key;
    this.removeNode(lru);
    this.map.remove(lru.key);
    this.count--;
  }
}

const CAPACITY = 3;

const MOCK_API_RESPONSES: Record<string, string> = {
  "/api/user/1": '{"id":1,"name":"Alice"}',
  "/api/user/2": '{"id":2,"name":"Bob"}',
  "/api/user/3": '{"id":3,"name":"Carol"}',
  "/api/user/4": '{"id":4,"name":"Mike"}',
  "/api/user/5": '{"id":5,"name":"Joe"}',
  "/api/posts": '[{"id":1,"title":"Hello"},{"id":2,"title":"List ops"}]',
  "/api/todos": '[{"id":1,"text":"Visit pages"},{"id":2,"text":"Go back"}]',
};

/**
 * React component demonstrating the LRU cache.
 */
const LRUCacheComponent = () => {
  const [cache] = useState(() => new LinkedListHashMapLRUCache(CAPACITY));
  const [order, setOrder] = useState<{ key: string; value: string }[]>([]);
  const [size, setSize] = useState(0);
  const [keyInput, setKeyInput] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [lastEvicted, setLastEvicted] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  const refresh = () => {
    setOrder(cache.getOrder());
    setSize(cache.size());
  };

  const put = () => {
    const key = keyInput.trim();
    if (!key) {
      setMessage("Please enter a key.");
      return;
    }
    const value =
      valueInput.trim() || MOCK_API_RESPONSES[key] || `{ "cached": true }`;
    cache.put(key, value);
    const evicted = cache.getLastEvictedKey();
    setResult(null);
    setLastEvicted(evicted);
    setMessage(
      evicted
        ? `Stored "${key}". Cache was full — evicted "${evicted}".`
        : `Stored "${key}".`
    );
    setKeyInput("");
    setValueInput("");
    refresh();
  };

  const get = () => {
    const key = keyInput.trim();
    if (!key) {
      setMessage("Please enter a key.");
      return;
    }
    const value = cache.get(key);
    setResult(value);
    setLastEvicted(null);
    setMessage(
      value !== null
        ? `Cache hit for "${key}".`
        : `Cache miss for "${key}" — not found.`
    );
    refresh();
  };

  return (
    <div className="p-4 border rounded shadow-lg w-[520px]">
      <h2 className="text-xl font-bold">⚡ LRU Cache for API Responses</h2>
      <p className="text-sm text-gray-500 mt-1">
        Capacity: {CAPACITY} · Current size: {size}
      </p>

      <div className="mt-4 flex flex-col gap-2">
        <input
          type="text"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          placeholder="API route / key (e.g. /api/user/1)"
          className="px-3 py-1 border rounded"
        />
        <input
          type="text"
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
          placeholder="Response value (optional — falls back to a mock)"
          className="px-3 py-1 border rounded"
        />
        <div className="flex gap-2">
          <button
            onClick={put}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            PUT
          </button>
          <button
            onClick={get}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            GET
          </button>
        </div>
      </div>

      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
      {lastEvicted && (
        <p className="mt-1 text-sm text-red-500">
          Evicted (LRU): {lastEvicted}
        </p>
      )}
      {result !== null && (
        <p className="mt-1 text-sm text-green-700">Result: {result}</p>
      )}

      <div className="mt-4">
        <p className="text-sm text-gray-500">Most recently used → least:</p>
        {order.length === 0 ? (
          <p className="text-sm text-gray-400">Cache is empty.</p>
        ) : (
          <ul className="mt-1 border rounded divide-y">
            {order.map(({ key, value }) => (
              <li key={key} className="px-3 py-1 flex justify-between gap-2 text-sm">
                <span className="font-mono">{key}</span>
                <span className="text-gray-500 truncate">{value}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LRUCacheComponent;