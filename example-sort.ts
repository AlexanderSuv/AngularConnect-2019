import {insertionSort} from "./algorithms/sorting/insertion-sort";
import {createBenchmark} from './benchmark';
import {isSorted} from "./algorithms/sorting/sort";
import {mergeSort} from "./algorithms/sorting/merge-sort";
import {iterativeMergeSort} from "./algorithms/sorting/iterative-merge-sort";
import {heapSort} from "./algorithms/sorting/heap-sort";

const COUNT = Number.parseInt(process.argv[2] || "10");

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

const HVsRecurrent = () => {
    const label = 'iterativeVsRecurrent';
    const benchmark = createBenchmark(label);

    const ITest = (n: number) => {
        const time = benchmark(`iterative: ${n}`);
        let a = array(n);
        while (time()) {
            a = iterativeMergeSort(a);
        }
        if (!isSorted(a)) throw 'not sorted';
        return time;
    };

    const HTest = (n: number) => {
        const time = benchmark(`heap: ${n}`);
        let a = array(n);
        while (time()) {
            a = heapSort(a);
        }
        if (!isSorted(a)) throw 'not sorted';
        return time;
    };

    [100000].forEach((n) => {
        ITest(n);
        HTest(n);
    });

    benchmark.report();
};

// mergeTest();
// iterativeMergeTest();
HVsRecurrent();
