export const desc = `English Ordinal Suffix ⭐⭐`;

export const code = `
/* _____             __        
  / ___/____ _____  / /_  ____ 
  \\__ \\/ __ \`/ __ \\/ __ \\/ __ \\
 ___/ / /_/ / /_/ / / / / /_/ /
/____/\\__,_/ .___/_/ /_/\\____/ 
          /_/                  
*/
// Get English ordinal suffix 
// for the day of the month (st, nd, rd, th)
// Example input: new Date(2018, 9, 30)
// Example output: 30th
function englishOrdinalSuffix(date) {
  // write your solution here 
}

`;

export const tests = [
    {
        title: 'function englishOrdinalSuffix exists',
        code: "equal(typeof englishOrdinalSuffix, 'function')",
    },
    {
        title: 'englishOrdinalSuffix(new Date(2018, 9, 30)) === "30th"',
        code: 'equal(englishOrdinalSuffix(new Date(2018, 9, 30)), "30th")',
    },
    {
        title: 'englishOrdinalSuffix(new Date(2018, 0, 12)) === "12th")',
        code: 'equal(englishOrdinalSuffix(new Date(2018, 0, 12)), "12th")',
    },
    {
        title: 'englishOrdinalSuffix(new Date(2018, 8, 2)) === "2nd"',
        code: 'equal(englishOrdinalSuffix(new Date(2018, 8, 2)), "2nd")',
    },
    {
        title: 'englishOrdinalSuffix(new Date(2018, 7, 1)) === "1st"',
        code: 'equal(englishOrdinalSuffix(new Date(2018, 7, 1)), "1st")',
    },
    {
        title: 'englishOrdinalSuffix(new Date(2018, 7, 3)) === "3rd"',
        code: 'equal(englishOrdinalSuffix(new Date(2018, 7, 3)), "3rd")',
    },
];
