import {Heap} from "./heap";

export class MinHeap extends Heap<number> {
    constructor() {
        super((a, b) => a - b);
    }
}
