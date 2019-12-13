export function insertionSort<T>(array: T[], compareFn?: (a: T, b: T) => number): T[] {
    for (let i = 0; i < array.length; i++) {
        for (let j = i; j > 0; j--) {
            if (compareFn ? compareFn(array[j], array[j - 1]) < 0 : array[j] < array[j - 1]) {
                [array[j], array[j - 1]] = [array[j - 1], array[j]];
            } else {
                break;
            }
        }
    }
    return array;
}
