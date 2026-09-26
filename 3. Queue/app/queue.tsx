export class Queue<T> {
    items: T[] = []

    enqueue(item: T): void {
        this.items.push(item)
    }

    dequeue(): T {
        let item = this.items.shift()
        if (item === undefined) {
            throw new Error("The queue is empty. Cannot dequeue from an empty queue.")
        }
        return item
    }

    get length(): number {
        return this.items.length
    }
    clone(): Queue<T> {
        const q = new Queue<T>()
        q.items = [...this.items]
        return q
    }
}

export class PriorityQueue<T> extends Queue<T> {
  private compare: (a: T, b: T) => number;

  /**
   * @param compare A custom comparator function.
   * (a, b) => a - b creates a Min-Priority Queue (smallest elements first).
   * (a, b) => b - a creates a Max-Priority Queue (largest elements first).
   */
  constructor(compare: (a: T, b: T) => number) {
    super();
    this.compare = compare;
  }

  override enqueue(item: T): void {
    if (this.length === 0) {
      super.enqueue(item);
      return;
    }

    let insertIndex = this.items.findIndex((currentItem) => this.compare(item, currentItem) < 0);

    if (insertIndex === -1) {
      super.enqueue(item);
    } else {
      this.items.splice(insertIndex, 0, item);
    }
  }

  override clone(): PriorityQueue<T> {
    const q = new PriorityQueue<T>(this.compare);
    q.items = [...this.items];
    return q;
  }
}
