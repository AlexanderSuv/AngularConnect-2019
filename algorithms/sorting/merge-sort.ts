export function mergeSort<T>(array: T[], compareFn?: (a: T, b: T) => number): T[] {
    if (array.length < 2) return array;
    const left = mergeSort(array.slice(0, array.length / 2), compareFn);
    const right = mergeSort(array.slice(array.length / 2), compareFn);

    return merge(left, right, compareFn);
}

function merge<T>(left: T[], right: T[], compareFn?: (a: T, b: T) => number): T[] {
    let res = [];
    let l = 0;
    let r = 0;
    while (l < left.length && r < right.length) {
        if (compareFn ? compareFn(left[l], right[r]) < 0 : left[l] < right[r]) {
            res.push(left[l]);
            l++;
        } else {
            res.push(right[r]);
            r++
        }
    }
    if (l < left.length) res = [...res, ...left.slice(l)];
    if (r < right.length) res = [...res, ...right.slice(r)];
    return res;
}
