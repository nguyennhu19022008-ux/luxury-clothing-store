const fs = require('fs');
const path = require('path');

const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;

function checkDir(dir) {
  let count = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      count += checkDir(full);
    } else if (/\.(jsx?|tsx?|html|css)$/.test(entry.name)) {
      const content = fs.readFileSync(full, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, i) => {
        if (emojiRegex.test(line)) {
          console.log(`EMOJI FOUND in ${full}:${i+1}: ${line}`);
          count++;
        }
      });
    }
  }
  return count;
}

const total = checkDir(path.resolve(__dirname, '..', 'src'));
console.log('Total emojis found in src:', total);
if (total > 0) {
  process.exit(1);
} else {
  console.log('PASS: 0 emojis in source code.');
  process.exit(0);
}
