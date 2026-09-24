export class Stack<T> {
    items: T[] = []
    push(item: T) {
        this.items.push(item)
    }
    pop(): T {
        return this.items.pop()!
    }
    get length(): number { return this.items.length }
}
