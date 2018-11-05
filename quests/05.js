export const desc = `Dec 2 Bin ⭐️`;

export const code = `
/* _____             __        
  / ___/____ _____  / /_  ____ 
  \\__ \\/ __ \`/ __ \\/ __ \\/ __ \\
 ___/ / /_/ / /_/ / / / / /_/ /
/____/\\__,_/ .___/_/ /_/\\____/ 
          /_/                  
*/
// Convert a decimal number to binary. 
function dec2bin(number) {
  // write your solution here 
}
`;

export const tests = [
    {
        title: 'function dec2bin exists',
        code: "equal(typeof dec2bin, 'function')",
    },
    {
        title: 'dec2bin(1) === "1"',
        code: 'equal(dec2bin(1),  "1")',
    },
    {
        title: 'dec2bin(5) === "101"',
        code: 'equal(dec2bin(5),  "101")',
    },
    {
        title: 'dec2bin(11) === "1011"',
        code: 'equal(dec2bin(9876),  "10011010010100")',
    },
];
