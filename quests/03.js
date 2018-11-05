export const desc = `RGB 2 HEX ⭐⭐️`;

export const code = `
// Convert RGB To Hex
// The valid decimal values for RGB are 0 - 255.

function rgb2hex(r, g, b) {
    // write your code here
}

`;

const haha =
    'String.prototype.toString = Number.prototype.toString = function() {throw new Error("Using toString would be too easy :-)");};';

export const tests = [
    {
        title: 'function rgb2hex exists',
        code: haha + "equal(typeof rgb2hex, 'function')",
    },
    {
        title: 'rgb2hex(255, 255, 255) => "FFFFFF"',
        code: 'equalAnycase(rgb2hex(255, 255, 255), "FFFFFF")',
    },
    {
        title: 'rgb2hex(255, 255, 300) => "FFFFFF"',
        code: 'equalAnycase(rgb2hex(255, 255, 300), "FFFFFF")',
    },
    {
        title: 'rgb2hex(0,0,0)  => "000000"',
        code: 'equalAnycase(rgb2hex(0,0,0), "000000")',
    },
    {
        title: 'rgb2hex(148, 0, 211) => "9400D3"',
        code: 'equalAnycase(rgb2hex(148, 0, 211), "9400D3")',
    },
];

const solution = `;
const alfa = '0123456789ABCDEF'.split('');

const c = n => {
  if (!n) return '00';
  let str = '';
  n = Math.min(Math.max(0, n), 255);
  while(n > 0) {
    str = alfa[n%16] + str;
    n = Math.floor(n / 16)
  }
  return str
}

function rgb2hex(r, g, b) {
  return c(r) + c(g) + c(b) ;
}

`;

const solution2 = `;

const alfa = '0123456789ABCDEF'.split('');

const all = Array(255).fill('');
alfa.map((_,i) => {
  alfa.map((_,j) => {
    all[(i*16)+j] = alfa[i]+alfa[j];
  })
})

const c = n => all[Math.min(255, Math.max(n, 0))];

// Convert RGB To Hex
// The valid decimal values for RGB are 0 - 255.
function rgb2hex(r, g, b) {
  return c(r) + c(g) + c(b) ;
}

`;
