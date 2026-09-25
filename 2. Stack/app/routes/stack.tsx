export class Stack<T> {
    items: T[] = []
    push(item: T) {
        this.items.push(item)
    }
    pop(): T {
        return this.items.pop()!
    }
    get length(): number { return this.items.length }
    clone(): Stack<T> {
        const s = new Stack<T>()
        s.items = [...this.items]
        return s
    }
}
