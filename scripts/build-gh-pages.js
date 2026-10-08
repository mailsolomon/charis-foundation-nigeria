import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const srcDir = path.join(rootDir, 'dist');
const destDir = path.join(rootDir, 'docs');

if (!fs.existsSync(srcDir)) {
  console.error('dist/ does not exist. Run vite build first.');
  process.exit(1);
}

// Clean and recreate docs/
if (fs.existsSync(destDir)) {
  fs.rmSync(destDir, { recursive: true, force: true });
}
fs.cpSync(srcDir, destDir, { recursive: true });

// Ensure 404.html is a copy of index.html for SPA support on GitHub Pages
const indexHtml = path.join(destDir, 'index.html');
const notFoundHtml = path.join(destDir, '404.html');
if (fs.existsSync(indexHtml)) {
  fs.copyFileSync(indexHtml, notFoundHtml);
}

// Ensure .nojekyll exists in docs/
fs.writeFileSync(path.join(destDir, '.nojekyll'), '');

console.log('GitHub Pages build prepared: docs/ directory is ready for deployment.');
