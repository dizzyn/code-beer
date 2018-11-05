export const desc = `The longest common subsequence ⭐⭐️️⭐️`;

export const code = `
// Given two strings, write a program that finds the longest
// common subsequence ignoring case. If there are multiple
// solutions, return the one that comes first in alphabetical order (A-Z).
// The function should return the subsequence in lower case.
function longestCommonSubstr(str1, str2) {
  // write your solution here
}
`;

export const tests = [
    {
        title: "longestCommonSubstr('Unicorn', 'communication') === 'unic'",
        code: "equal(longestCommonSubstr('Unicorn', 'communication'), 'unic')",
    },
    {
        title: "longestCommonSubstr('', 'abc') === '')",
        code: "equal(longestCommonSubstr('', 'abc'), '')",
    },
    {
        title: "longestCommonSubstr('AbabaAbaBac', 'bbbAaBAba') === 'baababa')",
        code: "equal(longestCommonSubstr('Ababaababac', 'bbbaababa'), 'baababa')",
    },
    {
        title: "longestCommonSubstr('Arrakis', 'arrakis') === 'arrakis')",
        code: "equal(longestCommonSubstr('Arrakis', 'arrakis'), 'arrakis')",
    },
    {
        title: "longestCommonSubstr('foobar', 'barfoo') === 'bar')",
        code: "equal(longestCommonSubstr('Arrakis', 'arrakis'), 'arrakis')",
    },
];
