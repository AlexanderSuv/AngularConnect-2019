import {insertionSort} from "./algorithms/sorting/insertion-sort";
import {Benchmark, createBenchmark} from './benchmark';
import {isSorted} from "./algorithms/sorting/sort";
import {mergeSort} from "./algorithms/sorting/merge-sort";
import {iterativeMergeSort} from "./algorithms/sorting/iterative-merge-sort";
import {heapSort} from "./algorithms/sorting/heap-sort";
import {quickSort, quickSortInPlace} from "./algorithms/sorting/quick-sort";

const COUNT = Number.parseInt(process.argv[2] || "10");

// todo: swap with temp vs destructuring
// todo: concat array with Array.prototype.concat vs spread operator

const array = (size: number) => new Array(size).fill(null).map(() => Math.round(Math.random() * size));

const insertionTest = () => {
    const label = 'insertion';
    const benchmark = createBenchmark(label);

    const test = (n: number) => {
        const time = benchmark(`${label}: ${n}`);
        const a = array(n);
        while (time()) {
            insertionSort(a);
        }
        if (!isSorted(a)) throw 'not sorted';
        return time;
    };

    [10, 100, 1000, 10000, 100000].forEach(test);

    benchmark.report();
};

const mergeTest = () => {
    const label = 'merge';
    const benchmark = createBenchmark(label);

    const test = (n: number) => {
        const time = benchmark(`merge: ${n}`);
        let a = array(n);
        while (time()) {
            a = mergeSort(a);
        }
        if (!isSorted(a)) throw 'not sorted';
        return time;
    };

    [10, 100, 1000, 10000, 100000, 1000000].forEach(test);

    benchmark.report();
};

const iterativeMergeTest = () => {
    const label = 'iterative merge';
    const benchmark = createBenchmark(label);

    const test = (n: number) => {
        const time = benchmark(`merge: ${n}`);
        let a = array(n);
        while (time()) {
            a = iterativeMergeSort(a);
        }
        if (!isSorted(a)) throw 'not sorted';
        return time;
    };

    [10, 100, 1000, 10000, 100000, 1000000].forEach(test);

    benchmark.report();
};

const quickSortInPlaceTest = () => {
    const label = 'quickSortInPlace';
    const benchmark = createBenchmark(label);

    const test = (n: number) => {
        const time = benchmark(`merge: ${n}`);
        let a = array(n);
        while (time()) {
            a = quickSortInPlace(a);
        }
        if (!isSorted(a)) throw 'not sorted';
        return time;
    };

    [1000].forEach(test);

    benchmark.report();
};

const sortingPerfTest = () => {
    const insertionSortTest = (n: number, benchmark: Benchmark) => {
        const time = benchmark(`insertion sort: ${n}`);
        let a = array(n);
        let res: number[] = [];
        while (time()) {
            res = insertionSort(a.slice());
        }
        if (!isSorted(res)) throw 'not sorted';
        return time;
    };

    const recurrentMergeSortTest = (n: number, benchmark: Benchmark) => {
        const time = benchmark(`recurrent merge sort: ${n}`);
        let a = array(n);
        let res: number[] = [];
        while (time()) {
            res = mergeSort(a.slice());
        }
        if (!isSorted(res)) throw 'not sorted';
        return time;
    };

    const iterativeMergeSortTest = (n: number, benchmark: Benchmark) => {
        const time = benchmark(`iterative merge sort: ${n}`);
        let a = array(n);
        let res: number[] = [];
        while (time()) {
            res = iterativeMergeSort(a.slice());
        }
        if (!isSorted(res)) throw 'not sorted';
        return time;
    };

    const heapSortTest = (n: number, benchmark: Benchmark) => {
        const time = benchmark(`heap sort: ${n}`);
        let a = array(n);
        let res: number[] = [];
        while (time()) {
            res = heapSort(a.slice());
        }
        if (!isSorted(res)) throw 'not sorted';
        return time;
    };

    const quickSortTest = (n: number, benchmark: Benchmark) => {
        const time = benchmark(`quick sort: ${n}`);
        let a = array(n);
        let res: number[] = [];
        while (time()) {
            res = quickSort(a.slice());
        }
        if (!isSorted(res)) throw 'not sorted';
        return time;
    };

    const quickSortInPlaceTest = (n: number, benchmark: Benchmark) => {
        const time = benchmark(`quick in place sort: ${n}`);
        let a = array(n);
        let res: number[] = [];
        while (time()) {
            res = quickSortInPlace(a.slice());
        }
        if (!isSorted(res)) throw 'not sorted';
        return time;
    };

    [100, 1000, 10000, 100000].forEach((n) => {
        const label = 'sortingPerfTest';
        const benchmark = createBenchmark(label + ` ${n}`);

        // insertionSortTest(n, benchmark);
        // recurrentMergeSortTest(n, benchmark);
        iterativeMergeSortTest(n, benchmark);
        // heapSortTest(n, benchmark);
        // quickSortTest(n, benchmark);
        // quickSortInPlaceTest(n, benchmark);

        benchmark.report();
    });
};

const qSortTest = (n: number, label = `qSort: ${n}`) => {
    const a = array(n);
    console.time(label);
    const res = quickSortInPlace(a);
    console.timeEnd(label);

    if (!isSorted(res)) throw 'not sorted';
};

// [10, 100, 1000, 10000, 100000, 1000000, 10000000].forEach(n => {
//     console.log('-----');
//     qSortTest(n);
//     qSortTest2(n);
// });

const swapTest = () => {
    const label = 'swap';
    const benchmark = createBenchmark(label);

    const destr = () => {
        const time = benchmark(`destructuring`);
        let a = array(10);
        while (time()) {
            [a[0], a[5]] = [a[5], a[0]]
        }
    };

    const tmp = () => {
        const time = benchmark(`tmp`);
        let a = array(10);

        function swap(arr: any, index1: number, index2: number) {
            const tmp = arr[index1];
            arr[index1] = arr[index2];
            arr[index2] = tmp;
        }

        while (time()) {
            swap(a, 0, 5)
        }
    };

    const tmp2 = () => {
        const time = benchmark(`tmp`);
        let a = array(10);

        function swap(index1: number, index2: number) {
            const tmp = a[index1];
            a[index1] = a[index2];
            a[index2] = tmp;
        }

        while (time()) {
            swap(0, 5)
        }
    };

    destr();
    tmp();
    tmp2();

    benchmark.report();
};

const concatTest = () => {
    const label = 'concat';
    const benchmark = createBenchmark(label);

    const destr = () => {
        const time = benchmark(`destructuring`);
        let a1 = array(10);
        let a2 = array(10);
        let a3 = array(10);
        while (time()) {
            [...a1, ...a2, ...a3];
        }
    };

    const concat = () => {
        const time = benchmark(`concat`);
        let a1 = array(10);
        let a2 = array(10);
        let a3 = array(10);

        while (time()) {
            a1.concat(a2, a3);
        }
    };

    destr();
    concat();

    benchmark.report();
};

// concatTest();

// mergeTest();
// iterativeMergeTest();
sortingPerfTest();
// quickSortInPlaceTest();

// console.log(isSorted(quickSortInPlace(array(10000000))));
// swapTest();
