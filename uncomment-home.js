const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'views', 'client', 'pages', 'home.pug');
let content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');

for (let i = 100; i < lines.length; i++) {
  if (lines[i].startsWith('//-')) {
    // Remove the first occurrence of `//- ` or `//-`
    lines[i] = lines[i].replace(/^\/\/- ?/, '');
  }
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Uncommented home.pug sections!');
