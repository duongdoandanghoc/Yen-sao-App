const fs = require('fs');
const path = require('path');

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('import Link from "next/link"')) {
        let newContent = content.replace(/import Link from "next\/link";?/g, 'import { Link } from "next-view-transitions";');
        fs.writeFileSync(fullPath, newContent);
        console.log("Updated " + fullPath);
      }
    }
  });
}

walk('./src');
