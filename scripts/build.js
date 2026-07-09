#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const sourcePath = path.join(root, 'lucUI.css');
const outputPath = path.join(root, 'lucUI.min.css');

const source = fs.readFileSync(sourcePath, 'utf8');
const imports = [...source.matchAll(/@import url\('([^']+)'\);/g)].map((match) => match[1]);

if (imports.length === 0) {
  console.error('No @import statements found in lucUI.css');
  process.exit(1);
}

const minified = [
  '/* lucUI v2.0 — minified entry (imports only) */',
  ...imports.map((file) => `@import url('${file}');`),
  '',
].join('');

fs.writeFileSync(outputPath, minified);
console.log(`Built ${outputPath} (${imports.length} imports)`);
