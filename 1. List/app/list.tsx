class ListNode<T> {
    e: T;
    prev: ListNode<T> | null = null;
    next: ListNode<T> | null = null;

    constructor(e: T) {
        this.e = e;
    }
}

interface List<T> {
    begin(): ListNode<T> | null;
    end(): ListNode<T> | null;

    size(): number

    current(): T | null
    back(): void
    forward(): void

    insertFront(e: T): void;
    insertBack(e: T): void;
    insert(n: ListNode<T>, e: T): void;

    eraseFront(): void;
    eraseBack(): void;
    erase(n: ListNode<T>): void;

    clearForward(): void
    moveToFront(n: ListNode<T>): void;

}
class DoublyLinkedList<T> implements List<T> {
    private head: ListNode<T> | null = null;
    private tail: ListNode<T> | null = null;
    private cursor: ListNode<T> | null = null;
    private count = 0;

    begin(): ListNode<T> | null {
        return this.head;
    }

    end(): ListNode<T> | null {
        return this.tail;
    }

    size(): number {
        return this.count;
    }

    current(): T | null {
        return this.cursor?.e ?? null;
    }

    back(): void {
        if (this.cursor?.prev) {
            this.cursor = this.cursor.prev;
        }
    }

    forward(): void {
        if (this.cursor?.next) {
            this.cursor = this.cursor.next;
        }
    }

    insertFront(e: T): void {
        const node = new ListNode<T>(e);

        if (this.head === null) {
            this.head = node;
            this.tail = node;
            this.cursor = node;
        } else {
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
        }

        this.count++;
    }

    insertBack(e: T): void {
        const node = new ListNode<T>(e);

        if (this.tail === null) {
            this.head = node;
            this.tail = node;
            this.cursor = node;
        } else {
            node.prev = this.tail;
            this.tail.next = node;
            this.tail = node;
        }

        this.count++;
    }

    insert(n: ListNode<T>, e: T): void {
        const node = new ListNode<T>(e);

        node.next = n;
        node.prev = n.prev;

        if (n.prev !== null) {
            n.prev.next = node;
        } else {
            this.head = node;
        }

        n.prev = node;

        this.count++;
    }

    eraseFront(): void {
        if (this.head === null) return;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
            this.cursor = null;
        } else {
            if (this.cursor === this.head) {
                this.cursor = this.head.next;
            }

            this.head = this.head.next;
            this.head!.prev = null;
        }

        this.count--;
    }

    eraseBack(): void {
        if (this.tail === null) return;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
            this.cursor = null;
        } else {
            if (this.cursor === this.tail) {
                this.cursor = this.tail.prev;
            }

            this.tail = this.tail.prev;
            this.tail!.next = null;
        }

        this.count--;
    }

    erase(n: ListNode<T>): void {
        if (n === this.cursor) {
            this.cursor = n.next ?? n.prev;
        }

        if (n.prev !== null) {
            n.prev.next = n.next;
        } else {
            this.head = n.next;
        }

        if (n.next !== null) {
            n.next.prev = n.prev;
        } else {
            this.tail = n.prev;
        }

        n.prev = null;
        n.next = null;

        this.count--;
    }

    clearForward(): void {
        if (this.cursor === null) return;

        let node = this.cursor.next;

        while (node !== null) {
            node = node.next;
            this.count--;
        }

        this.cursor.next = null;
        this.tail = this.cursor;
    }

    moveToFront(n: ListNode<T>): void {
        if (n === this.head) return;
        if (n.prev) n.prev.next = n.next; else this.head = n.next;
        if (n.next) n.next.prev = n.prev; else this.tail = n.prev;
        n.prev = null;
        n.next = this.head;
        if (this.head) this.head.prev = n;
        this.head = n;
        if (!this.tail) this.tail = n;
    }
}
export { DoublyLinkedList, ListNode}