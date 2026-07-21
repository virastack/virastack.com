const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      if (!file.includes('node_modules') && !file.includes('.next') && !file.includes('.git')) {
        results = results.concat(walk(file));
      }
    } else { 
      if (!file.endsWith('pnpm-lock.yaml') && !file.endsWith('.tsbuildinfo') && !file.endsWith('.png') && !file.endsWith('.jpg') && !file.endsWith('.ico') && !file.endsWith('.woff2') && !file.endsWith('.svg') && !file.endsWith('.webp')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('.');

files.forEach(file => {
  try {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    content = content.replace(/@virastack\/mask/g, '@virastack/mask');
    content = content.replace(/@virastack\/password/g, '@virastack/password');
    content = content.replace(/@virastack\/ai/g, '@virastack/ai');
    
    // Also replace URLs
    content = content.replace(/\/mask/g, '/mask');
    content = content.replace(/\/password/g, '/password');
    content = content.replace(/\/ai/g, '/ai');

    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Updated', file);
    }
  } catch (e) {
    // skip binary files or unreadable files
  }
});
