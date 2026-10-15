interface BTreeNode {
  keys: number[];
  children: BTreeNode[];
  leaf: boolean;
}

export class BTree {
  private root: BTreeNode;
  private t: number;

  constructor(degree = 2) {
    this.t = degree;
    this.root = { keys: [], children: [], leaf: true };
  }

  search(key: number): boolean {
    return this.searchNode(this.root, key);
  }

  private searchNode(node: BTreeNode, key: number): boolean {
    let i = 0;
    while (i < node.keys.length && key > node.keys[i]!) i++;
    if (i < node.keys.length && key === node.keys[i]!) return true;
    return node.leaf ? false : this.searchNode(node.children[i]!, key);
  }

  insert(key: number): void {
    if (this.search(key)) return; // ignore duplicates
    if (this.root.keys.length === 2 * this.t - 1) {
      const newRoot: BTreeNode = {
        keys: [],
        children: [this.root],
        leaf: false,
      };
      this.root = newRoot;
      this.splitChild(newRoot, 0);
      this.insertNonFull(newRoot, key);
    } else {
      this.insertNonFull(this.root, key);
    }
  }

  delete(key: number): void {
    this.deleteFromNode(this.root, key);
    if (this.root.keys.length === 0 && !this.root.leaf) {
      this.root = this.root.children[0]!;
    }
  }

  inorder(): number[] {
    const result: number[] = [];
    const traverse = (node: BTreeNode): void => {
      for (let i = 0; i < node.keys.length; i++) {
        if (!node.leaf) traverse(node.children[i]!);
        result.push(node.keys[i]!);
      }
      if (!node.leaf) traverse(node.children[node.keys.length]!);
    };
    traverse(this.root);
    return result;
  }

  private splitChild(parent: BTreeNode, i: number): void {
    const t = this.t;
    const full = parent.children[i]!;
    const right: BTreeNode = {
      keys: full.keys.splice(t),
      children: [],
      leaf: full.leaf,
    };
    if (!full.leaf) right.children = full.children.splice(t);
    parent.keys.splice(i, 0, full.keys.pop()!);
    parent.children.splice(i + 1, 0, right);
  }

  private insertNonFull(node: BTreeNode, key: number): void {
    let i = node.keys.length - 1;
    if (node.leaf) {
      node.keys.push(key);
      node.keys.sort((a, b) => a - b);
      return;
    }
    while (i >= 0 && key < node.keys[i]!) i--;
    i++;
    if (node.children[i]!.keys.length === 2 * this.t - 1) {
      this.splitChild(node, i);
      if (key > node.keys[i]!) i++;
    }
    this.insertNonFull(node.children[i]!, key);
  }

  private deleteFromNode(node: BTreeNode, key: number): void {
    const t = this.t;
    let i = 0;
    while (i < node.keys.length && key > node.keys[i]!) i++;

    if (i < node.keys.length && node.keys[i] === key) {
      if (node.leaf) {
        node.keys.splice(i, 1);
      } else if (node.children[i]!.keys.length >= t) {
        const predKey = this.getPredecessor(node.children[i]!);
        node.keys[i] = predKey;
        this.deleteFromNode(node.children[i]!, predKey);
      } else if (node.children[i + 1]!.keys.length >= t) {
        const succKey = this.getSuccessor(node.children[i + 1]!);
        node.keys[i] = succKey;
        this.deleteFromNode(node.children[i + 1]!, succKey);
      } else {
        this.mergeChildren(node, i);
        this.deleteFromNode(node.children[i]!, key);
      }
      return;
    }

    if (node.leaf) return; // key not found

    const lastChild = i === node.keys.length;
    if (node.children[i]!.keys.length < t) {
      this.fillChild(node, i);
    }
    if (lastChild && i > node.keys.length) {
      this.deleteFromNode(node.children[i - 1]!, key);
    } else {
      this.deleteFromNode(node.children[i]!, key);
    }
  }

  private getPredecessor(node: BTreeNode): number {
    while (!node.leaf) node = node.children[node.children.length - 1]!;
    return node.keys[node.keys.length - 1]!;
  }

  private getSuccessor(node: BTreeNode): number {
    while (!node.leaf) node = node.children[0]!;
    return node.keys[0]!;
  }

  private mergeChildren(parent: BTreeNode, i: number): void {
    const left = parent.children[i]!;
    const right = parent.children[i + 1]!;
    left.keys.push(parent.keys.splice(i, 1)[0]!);
    left.keys.push(...right.keys);
    if (!left.leaf) left.children.push(...right.children);
    parent.children.splice(i + 1, 1);
  }

  private fillChild(parent: BTreeNode, i: number): void {
    const t = this.t;
    if (i > 0 && parent.children[i - 1]!.keys.length >= t) {
      const child = parent.children[i]!;
      const prev = parent.children[i - 1]!;
      child.keys.unshift(parent.keys[i - 1]!);
      parent.keys[i - 1] = prev.keys.pop()!;
      if (!child.leaf) child.children.unshift(prev.children.pop()!);
    } else if (i < parent.keys.length && parent.children[i + 1]!.keys.length >= t) {
      const child = parent.children[i]!;
      const next = parent.children[i + 1]!;
      child.keys.push(parent.keys[i]!);
      parent.keys[i] = next.keys.shift()!;
      if (!child.leaf) child.children.push(next.children.shift()!);
    } else if (i < parent.keys.length) {
      this.mergeChildren(parent, i);
    } else {
      this.mergeChildren(parent, i - 1);
    }
  }
}
