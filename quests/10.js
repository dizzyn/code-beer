export const desc = `HEX 2 RGB ⭐⭐️️⭐️⭐️`;

export const code = `
// Convert Hex To RGB
// Example input: #991e20
// Example output: 153,30,32

function hexToRGB(text) {
  // write your solution here 
}

`;

const haha = 'parseInt = function() {throw new Error("Using parseInt would be too easy :-)");};';

export const tests = [
    {
        title: 'function hexToRGB exists',
        code: haha + "equal(typeof hexToRGB, 'function')",
    },
    {
        title: 'hexToRGB("#991e20") === "153,30,32"',
        code: 'equal(hexToRGB("#991e20"), "153,30,32")',
    },
    {
        title: 'hexToRGB("#ffffff") === "255,255,255"',
        code: 'equal(hexToRGB("#ffffff"), "255,255,255")',
    },
    {
        title: 'hexToRGB("#0092d6") === "0,146,214"',
        code: 'equal(hexToRGB("#0092d6"), "0,146,214")',
    },
];
