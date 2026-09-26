export class Stack<T> {
    items: T[] = []
    push(item: T) {
        this.items.push(item)
    }
    pop(): T {
        let p = this.items.pop()
        if (!p){
            throw new Error("The stack is empty. Cannot pop empty stack")
        }
        return p
    }
    get length(): number { return this.items.length }
    clone(): Stack<T> {
        const s = new Stack<T>()
        s.items = [...this.items]
        return s
    }
}
