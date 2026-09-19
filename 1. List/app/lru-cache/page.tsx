'use client'
import { useState } from "react";
import { DoublyLinkedList } from "../list";
import { HashMap } from "../map";

type Entry = { key: string; value: string };

interface LRUCache {
  get(key: string): string | null
  put(key: string, value: string): void
  size(): number
  getLastEvictedKey(): string | null
  getOrder(): { key: string; value: string }[]
}


class LinkedListHashMapLRUCache implements LRUCache {
  private list = new DoublyLinkedList<Entry>();
  private map = new HashMap<Entry>();
  private capacity: number;
  private lastEvictedKey: string | null = null;

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: string): string | null {
    const node = this.map.get(key);
    if (!node) return null;
    this.list.moveToFront(node);
    return node.e.value;
  }

  put(key: string, value: string): void {
    const existing = this.map.get(key);
    if (existing) {
      existing.e.value = value;   // mutate payload, node identity survives
      this.list.moveToFront(existing);
      return;
    }

    if (this.list.size() >= this.capacity) this.evict();

    this.list.insertFront({ key, value });
    const node = this.list.begin()
    this.map.set(key, node!);
  }

  size(): number {
    return this.list.size();        // single source of truth, drop `count`
  }
  getLastEvictedKey(): string | null {
    const key = this.lastEvictedKey;
    this.lastEvictedKey = null;
    return key;
  }

  getOrder(): Entry[] {
    const out: Entry[] = [];
    for (let n = this.list.begin(); n !== null; n = n.next) out.push(n.e);
    return out;
  }


  private evict(): void {
    const lru = this.list.end();
    if (!lru) return;
    this.lastEvictedKey = lru.e.key;
    this.map.remove(lru.e.key);
    this.list.eraseBack();
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