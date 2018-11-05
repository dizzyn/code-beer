export const desc = `Palindrom ⭐️`;

export const code = `
// Check if the given string is palindrome or not 
function isPalindrome(str) {
  // write your solution here 
}
`;

export const tests = [
    {
        title: 'function isPalindrome exists',
        code: "equal(typeof isPalindrome, 'function')",
    },
    {
        title: 'isPalindrome("anna") === true',
        code: 'equal(isPalindrome("anna"), true)',
    },
    {
        title: 'isPalindrome("A Santa dog lived as a devil God at NASA") === true',
        code: 'equal(isPalindrome("A Santa dog lived as a devil God at NASA"), true)',
    },
    {
        title: 'isPalindrome("Sapho Booth - Code & Beer") === false',
        code: 'equal(isPalindrome("Sapho Booth - Code & Beer"), false)',
    },
];
