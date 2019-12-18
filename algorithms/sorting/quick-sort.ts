export function quickSort<T>(array: T[], compareFn?: (a: T, b: T) => number): T[] {
    if (array.length <= 1) return array;

    const pivot = Math.floor((array.length - 1) / 2);

    const left = [];
    const center = [];
    const right = [];

    for (let i = 0; i < array.length; i++) {
        if (compareFn ? compareFn(array[i], array[pivot]) === 0 : array[i] === array[pivot]) {
            center.push(array[i]);
        } else if (compareFn ? compareFn(array[i], array[pivot]) < 0 : array[i] < array[pivot]) {
            left.push(array[i]);

        } else {
            right.push(array[i]);
        }
    }

    const leftSorted = quickSort(left, compareFn);
    const rightSorted = quickSort(right, compareFn);

    return [...leftSorted, ...center, ...rightSorted];
}

export function quickSortInPlace<T>(array: T[], lower = 0, upper = array.length - 1): T[] {
    if (array.length <= 1) return array;

    function sort<T>(array: T[], lower: number, upper: number): number {
        const pivot = array[upper];
        let partitionIndex = lower;

        const swap = (leftIndex: any, rightIndex: any) => {
            const temp = array[leftIndex];
            array[leftIndex] = array[rightIndex];
            array[rightIndex] = temp;
        };

        for (let i = lower; i < upper; i++) {
            if (array[i] < pivot) {
                swap(partitionIndex, i);
                partitionIndex++;
            }
        }

        swap(partitionIndex, upper);

        return partitionIndex;
    }

    if (lower < upper) {
        const partitionIndex = sort(array, lower, upper);
        quickSortInPlace(array, lower, partitionIndex - 1);
        quickSortInPlace(array, partitionIndex + 1, upper);
    }

    return array;
}

