export const desc = `GCD ⭐️⭐️`;

export const code = `
// Find the greatest common divisor of two positive numbers,
// ie. the largest positive number that divides each of the numbers.
function gcd(num1, num2) {
  // write your solution here 
}
`;

export const tests = [
    {
        title: 'function gcd exists',
        code: "equal(typeof gcd, 'function')",
    },
    {
        title: 'gcd(982, 58) === 2',
        code: 'equal(gcd(982, 58),  2)',
    },
    {
        title: 'gcd(978690, 130) === 10',
        code: 'equal(gcd(978690, 130), 10)',
    },
    {
        title: 'gcd(60640, 758) === 758',
        code: 'equal(gcd(6095961, 12345), 2469)',
    },
    {
        title: 'gcd(1, 1) === 1',
        code: 'equal(gcd(1, 1), 1)',
    },
];
