export const desc = `Valid Braces ⭐️⭐️⭐️`;

export const code = `
// Take a string of braces, and determine if the order 
// of the braces is valid. It should return true 
// if the string is valid, and false if it's invalid.
// All input strings are nonempty, and will only consist 
// of parentheses, brackets and curly braces: ()[]{}.
function validBraces(text) {
  // write your code here
}`;

export const tests = [
    {title: 'validBraces("(){}[]") === true', code: 'equal(validBraces("(){}[]"), true)'},
    {title: 'validBraces("([{}])") === true', code: 'equal(validBraces("([{}])"), true)'},
    {title: 'validBraces("(}") === false', code: 'equal(validBraces("(}"), false)'},
    {title: 'validBraces("[(])") === false', code: 'equal(validBraces("[(])"), false)'},
    {title: 'validBraces("[({})](]") === false', code: 'equal(validBraces("[({})](]"), false)'},
];
