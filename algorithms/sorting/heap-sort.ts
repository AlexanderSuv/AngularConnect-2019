import {Heap} from "../../data-structures/heap";

export function heapSort<T>(array: T[], compareFn?: (a: T, b: T) => number): T[] {
    const res: T[] = [];
    const heap = new Heap<T>(compareFn);

    for (let i of array) {
        heap.add(i);
    }

    for (let i = 0; i < array.length; i++) {
        res.push(heap.pop() as T);
    }

    return res;
}
