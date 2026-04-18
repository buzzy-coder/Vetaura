const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'components');

const replacements = [
  { search: /#64748B/gi, replace: 'var(--color-text-muted)' },
  { search: /#CBD5E1/gi, replace: 'var(--color-text-muted)' },
  { search: /background:\s*'white'/gi, replace: "background: 'var(--color-card-bg)'" },
  { search: /backgroundColor:\s*'white'/gi, replace: "backgroundColor: 'var(--color-card-bg)'" },
  { search: /background:\s*'#ffffff'/gi, replace: "background: 'var(--color-card-bg)'" },
  { search: /background:\s*"white"/gi, replace: "background: 'var(--color-card-bg)'" },
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let changed = false;
      
      replacements.forEach(({ search, replace }) => {
        if (search.test(content)) {
          content = content.replace(search, replace);
          changed = true;
        }
      });
      
      if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
      }
    }
  });
}

processDirectory(directoryPath);
processDirectory(path.join(__dirname, 'app'));
