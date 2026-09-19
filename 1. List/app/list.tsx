class ListNode {
    e: string;
    prev: ListNode | null = null;
    next: ListNode | null = null;

    constructor(e: string) {
        this.e = e;
    }
}

interface List {
    begin(): ListNode | null;
    end(): ListNode | null;

    size(): number

    current(): string | null
    back(): void
    forward(): void

    insertFront(e: string): void;
    insertBack(e: string): void;
    insert(n: ListNode, e: string): void;

    eraseFront(): void;
    eraseBack(): void;
    erase(n: ListNode): void;

    clearForward(): void

}
class DoublyLinkedList implements List {
    private head: ListNode | null = null;
    private tail: ListNode | null = null;
    private cursor: ListNode | null = null;
    private count = 0;

    begin(): ListNode | null {
        return this.head;
    }

    end(): ListNode | null {
        return this.tail;
    }

    size(): number {
        return this.count;
    }

    current(): string | null {
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

    insertFront(e: string): void {
        const node = new ListNode(e);

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

    insertBack(e: string): void {
        const node = new ListNode(e);

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

    insert(n: ListNode, e: string): void {
        const node = new ListNode(e);

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

    erase(n: ListNode): void {
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
}
export { DoublyLinkedList }