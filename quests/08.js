export const desc = `Sum Matrix ⭐⭐⭐️️`;

export const code = `
// Sum matrix vertically -> output is a sum of columns
// Example:
// input = [
//     [1,1,1,1],
//     [2,2,2,2],
//     [3,3,3,3]
// ]
// output = [6,6,6,6]
function verticalSum(matrix) {
  // write your solution here 
}
`;

export const tests = [
    {
        title: 'function verticalSum exists',
        code: "equal(typeof verticalSum, 'function')",
    },
    {
        title: `verticalSum([[1,1],[2,2]]) === [3,3]`,
        code: 'equal(verticalSum([[1,1],[2,2]]), [3,3])',
    },
    {
        title:
            'verticalSum([[123,456,789,101112],[1,5,78,90],[134,5,57,0],[444,555,333,888]]) === [702,1021,1257,102090]',
        code:
            'equal(verticalSum([[123,456,789,101112],[1,5,78,90],[134,5,57,0],[444,555,333,888]]), [702,1021,1257,102090])',
    },
    {
        title: 'verticalSum([[-1],[2,-2],[3,3,3],[4,4,4,4]]) === [8,5,7,4]',
        code: 'equal(verticalSum([[-1],[2,-2],[3,3,3],[4,4,4,4]]), [8,5,7,4])',
    },
];
