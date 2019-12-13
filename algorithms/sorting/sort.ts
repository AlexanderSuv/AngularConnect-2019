export interface ISort<T> {
    (compareFn?: (a: T, b: T) => number): this
}

export function isSorted<T>(array: T[]): boolean {
    for (let i = 1; i < array.length; i++) {
        if (array[i - 1] > array[i]) return false;
    }
    return true;
}
