export function iterativeMergeSort<T>(array: T[], compareFn?: (a: T, b: T) => number): T[] {
    if (array.length < 2) return array;
    const result: T[] = [];
    for (let width = 1; width < array.length; width = width * 2) {

        for (let i = 0; i < array.length; i = i + 2 * width) {
            merge(array, i, Math.min(i + width, array.length), Math.min(i + 2 * width, array.length), result, compareFn);
        }

        array = result.slice();
    }
    return result;
}

function merge<T>(array: T[], l: number, r: number, end: number, result: T[], compareFn?: (a: T, b: T) => number) {
    let i = l;
    let j = r;
    for (let k = l; k < end; k++) {
        if (i < r && (j >= end || (compareFn ? compareFn(array[i], array[j]) <= 0 : array[i] <= array[j]))) {
            result[k] = array[i];
            i++
        } else {
            result[k] = array[j];
            j++;
        }
    }
}
