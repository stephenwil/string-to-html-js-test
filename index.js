// Import stylesheets
import './style.css';

const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>String to HTML</h1><p>See the console for output also</p>`;


const inputExamples = [
 ['div'],
 ['h1','text'],
 ['span','more','text'],
 ['a',['b','More'],' text'],  // <a><b>More text</b></a>
 ['p','<b>Text</b>'],
 ['p','<b>Text</b>',['div','p',['span','very',' nested']]],
 ['p',['p']]
];

const escapeHtml = (textToEscape) => {
  let tempEl = document.createElement('div');
  tempEl.textContent = textToEscape;
  return tempEl.innerHTML; // Allow the browser to do the escaping.
}

const parse = (arr) => {
  let result = '';

  if (arr && arr.length) {
    if (arr.length === 1) {
      return (`<${arr[0]}/>`);
      return result;
    } else {
      result+= `<${arr[0]}>`
      arr.slice(1).reduce((accum, curr) => {

          if (Array.isArray(curr)) {
            result += parse(curr);
          } else {
            result+= escapeHtml(curr);
          }
      },'');
      result+= `</${arr[0]}>`

      return result;
    }
  }
}

const table = document.querySelector('table');
const tableRow = document.querySelector('.heading');

inputExamples.forEach((example, idx) => {

  let result = parse(example);

  let inputTR = document.createElement('tr');
  inputTR.innerHTML=`<td>${JSON.stringify(example)}</td><td>${result}</td>`;
  table.appendChild(inputTR);

  console.log(`%cTest ${idx}`,'color: blue');
  console.log(`Input: ${JSON.stringify(example)}`);
  console.log(`Output: ${result}`);
})
