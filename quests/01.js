export const desc = `First N Smallest ⭐️⭐️`;

export const code = `
// Return N smallest elements in original order.
// You are given an array of integers and the count.
// - the number of elements to be returned cannot be higher
//   than the array length
// - elements can be duplicated
// - keep the original order of elements
function firstNSmallest(list, count) {
  // write your code here
}

`;

export const tests = [
    {
        title: 'function firstNSmallest exists',
        code: "equal(typeof firstNSmallest, 'function')",
    },
    {
        title: 'firstNSmallest([5,4,3,2,1], 3)  == [3,2,1]',
        code: 'equal(firstNSmallest([5,4,3,2,1], 3),  [3,2,1])',
    },
    {
        title: 'firstNSmallest([1,2,3,4,1], 3)  == [1,2,1]',
        code: 'equal(firstNSmallest([1,2,3,4,1], 3), [1,2,1])',
    },
    {
        title: 'firstNSmallest([1,2,3,-4,0], 3) == [1,-4,0]',
        code: 'equal(firstNSmallest([1,2,3,-4,0], 3), [1,-4,0])',
    },
    {
        title: 'firstNSmallest([1,2,3,4,5], 3)  == [1,2,3]',
        code: 'equal(firstNSmallest([1,2,3,4,5], 3), [1,2,3])',
    },
];
