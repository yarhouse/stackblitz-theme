// https://medium.com/developers-writing/fibonacci-sequence-algorithm-in-javascript-b253dc7e320e
export function fibonacci(num: number, memo?: any): number {
    memo = memo || {};

    if (memo[num]) { return memo[num]; }
    if (num <= 1) { return 1; }

    return memo[num] = fibonacci(num - 1, memo) + fibonacci(num - 2, memo);
}
