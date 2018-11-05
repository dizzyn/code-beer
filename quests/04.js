export const desc = `Power of 2 ⭐️⭐️⭐️`;

export const code = `
// Test if a number is a power of 2
function isPowerOf2(num) {
  // write your solution here 
}
`;

const sqrt = 'Math.sqrt = function() {throw new Error("Using Math.sqrt would be too easy :-)");};';

export const tests = [
    {
        title: 'function isPowerOf2 exists',
        code: sqrt + "equal(typeof isPowerOf2, 'function')",
    },
    {
        title: 'isPowerOf2(8) === true',
        code: 'equal(isPowerOf2(8), true)',
    },
    {
        title: 'isPowerOf2("React") === false',
        code: 'equal(isPowerOf2("React"), false)',
    },
    {
        title: 'isPowerOf2(17179869184) === true',
        code: 'equal(isPowerOf2(17179869184), true)',
    },
    {
        title: 'isPowerOf2(8388612) === false',
        code: 'equal(isPowerOf2(8388612), false)',
    },
    {
        title: 'isPowerOf2(1099511627776) === true',
        code: 'equal(isPowerOf2(1099511627776), true)',
    },
];
