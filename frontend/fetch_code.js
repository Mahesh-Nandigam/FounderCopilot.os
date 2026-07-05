import fs from 'fs/promises';

fetch('https://21st.dev/@aayush-duhan/components/halftone-trail')
  .then(r => r.text())
  .then(async html => {
    await fs.writeFile('page.html', html);
    console.log('Done');
  });
