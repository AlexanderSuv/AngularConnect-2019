export class Heap<T> {
    private array: T[] = [];

    constructor(private compareFn?: (a: T, b: T) => number) {
    }

    private leftChildIndex(index: number): number {
        return (index * 2) + 1;
    }

    private rightChildIndex(index: number): number {
        return (index * 2) + 2;
    }

    private parentIndex(index: number): number {
        return Math.floor((index - 1) / 2);
    }

    private hasParent(index: number): boolean {
        return this.parentIndex(index) >= 0;
    }

    private hasLeftChild(index: number): boolean {
        return this.leftChildIndex(index) < this.array.length;
    }

    private hasRightChild(index: number): boolean {
        return this.rightChildIndex(index) < this.array.length;
    }

    add(item: T) {
        this.array.push(item);
        this.heapifyUp();
    }

    pop(): T | undefined {
        if (!this.array.length) return;
        if (this.array.length === 1) return this.array.pop();
        const item = this.array[0];

        this.array[0] = this.array.pop() as T;

        this.heapifyDown();
        return item;
    }

    heapifyUp(startIndex: number = this.array.length - 1) {
        let currentIndex = startIndex;
        while (this.hasParent(currentIndex) && !this.isInCorrectOrder(this.parentIndex(currentIndex), currentIndex)) {
            this.swap(this.parentIndex(currentIndex), currentIndex);
            currentIndex = this.parentIndex(currentIndex);
        }
    }

    heapifyDown(startIndex: number = 0) {
        let currentIndex = startIndex;
        let nextIndex = null;
        while (this.hasLeftChild(currentIndex)) {
            if (this.hasRightChild(currentIndex) && this.isInCorrectOrder(this.rightChildIndex(currentIndex), this.leftChildIndex(currentIndex))) {
                nextIndex = this.rightChildIndex(currentIndex);
            } else {
                nextIndex = this.leftChildIndex(currentIndex);
            }

            if (this.isInCorrectOrder(currentIndex, nextIndex)) {
                break;
            }

            this.swap(currentIndex, nextIndex);
            currentIndex = nextIndex;
        }
    }

    private compare(a: T, b: T): boolean {
        return this.compareFn ? this.compareFn(a, b) <= 0 : a <= b;
    }

    private isInCorrectOrder(a: number, b: number): boolean {
        return this.compare(this.array[a], this.array[b]);
    }

    private swap(index1: number, index2: number) {
        const tmp = this.array[index1];
        this.array[index1] = this.array[index2];
        this.array[index2] = tmp;
    }

}
