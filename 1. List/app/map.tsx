import { ListNode } from "./list";


/**
 * A small HashMap implemented from scratch (the problem forbids the
 * built-in `Map`/`Set`). Keys are hashed into an array of buckets and
 * collisions are handled with chaining (per-bucket arrays).
 */
class HashMap<T> {
    private buckets: Array<Array<{ key: string; value: ListNode<T> }>>;
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

    get(key: string): ListNode<T> | undefined {
        const bucket = this.buckets[this.bucketIndex(key)];
        const entry = bucket.find((e) => e.key === key);
        return entry ? entry.value : undefined;
    }

    set(key: string, value: ListNode<T>): void {
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

export {HashMap}