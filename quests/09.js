export const desc = `Longest Word ⭐️⭐️`;

export const code = `
// Return the longest word from a string.
// If there are two or more words that are the same length, return the first word from the string with that length.
// Ignore punctuation. Hyphens and letters with accents are considered to be word characters.
function longestWord(text) {
  return "";
}

`;

export const tests = [
    {
        title: `longestWord('') === ''`,
        code: "equal(longestWord(''), '')",
    },
    {
        title: `longestWord('Curiosity') === 'Curiosity'`,
        code: "equal(longestWord('Curiosity'), 'Curiosity')",
    },
    {
        title: `longestWord('I love dogs.') === 'love'`,
        code: "equal(longestWord('I love dogs.'), 'love')",
    },
    {
        title: `longestWord(...random sentence...) === correct result 😉`,
        code: `
          (() => {
            function reference(text) {
              const words = text.split(/[&! ,.;]/);
              let max = "";
              for(let i = 0; i < words.length; i++) {
                if(max.length < words[i].length) {
                  max = words[i];
                }
              }
              return max;
            }
            
            const WORD_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            const PUNCTUATION_CHARS = "&! ,.;";
            
            function makeRandomString(possible, length) {
              var text = "";
              var maxLength = length ? length : (Math.floor(Math.random() * 10) + 1);
            
              for (var i = 0; i < maxLength; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            
              return text;
            }
            
            function makeRandomSentence() {
              return Array.from(Array(5).keys()).map(() => {
                return makeRandomString(WORD_CHARS) + makeRandomString(PUNCTUATION_CHARS, 1) + ' ';
              }).join('').trim();
            }

            const sentence = makeRandomSentence();
            return equal(longestWord(sentence), reference(sentence))
          })()
        `,
        //code: `equal(longestWord('${randomSentence}'), '${reference(randomSentence)}')`,
    },
    {
        title: `longestWord('Dark-blue is my favourite color.') === 'Dark-blue'`,
        code: "equal(longestWord('Dark-blue is my favourite color.'), 'Dark-blue')",
    },
    {
        title: `longestWord('Příliš žluťoučký kůň úpěl ďábelské ódy.') === 'žluťoučký'`,
        code: "equal(longestWord('Příliš žluťoučký kůň úpěl ďábelské ódy.'), 'žluťoučký')",
    },
    {
        title: `longestWord('fun&!!time') === 'time'`,
        code: "equal(longestWord('fun!!time'), 'time')",
    },
];
