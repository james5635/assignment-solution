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
