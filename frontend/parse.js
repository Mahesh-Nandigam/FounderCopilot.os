import fs from 'fs';

const html = fs.readFileSync('page.html', 'utf8');
const match = html.match(/"code":"(.*?)"/g);
if (match) {
  match.forEach((m, i) => {
    // extract the actual code value
    let codeStr = m.substring(8, m.length - 1);
    
    // Decode JSON-encoded string
    try {
      codeStr = JSON.parse('"' + codeStr + '"');
    } catch(e) {}
    
    fs.writeFileSync('code_' + i + '.txt', codeStr);
    console.log('Saved code_' + i + '.txt');
  });
} else {
  console.log('No matches');
}
