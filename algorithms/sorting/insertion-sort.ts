export function insertionSort<T>(array: T[], compareFn?: (a: T, b: T) => number): T[] {
    function swap(index1: number, index2: number) {
        const tmp = array[index1];
        array[index1] = array[index2];
        array[index2] = tmp;
    }

    for (let i = 0; i < array.length; i++) {
        for (let j = i; j > 0; j--) {
            if (compareFn ? compareFn(array[j], array[j - 1]) < 0 : array[j] < array[j - 1]) {
                swap(j, j - 1);
            } else {
                break;
            }
        }
    }
    return array;
}
