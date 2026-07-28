#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const sourcePath = path.join(root, 'lucUI.source.css');
const bundlePath = path.join(root, 'lucUI.css');
const minifiedPath = path.join(root, 'lucUI.min.css');
const importPattern = /@import\s+(?:url\()?['"]([^'"]+)['"]\)?\s*;/g;
const externalImports = new Set();
const visitedFiles = new Set();

function isExternalImport(value) {
    return /^(?:https?:)?\/\//.test(value) || value.startsWith('data:');
}

function readStylesheet(filePath) {
    const absolutePath = path.resolve(filePath);
    if (visitedFiles.has(absolutePath)) return '';
    if (!fs.existsSync(absolutePath)) {
        throw new Error(`Missing stylesheet: ${path.relative(root, absolutePath)}`);
    }

    visitedFiles.add(absolutePath);
    const source = fs.readFileSync(absolutePath, 'utf8');
    const nestedImports = [];
    const body = source.replace(importPattern, (_rule, importValue) => {
        if (isExternalImport(importValue)) {
            externalImports.add(importValue);
        } else {
            nestedImports.push(path.resolve(path.dirname(absolutePath), importValue));
        }
        return '';
    });

    const cleanBody = body.replace(/[ \t]+$/gm, '');
    const nested = nestedImports.map(readStylesheet).filter(Boolean).join('\n');
    const relativePath = path.relative(root, absolutePath).replaceAll(path.sep, '/');
    return `${nested}${nested ? '\n' : ''}/* Source: ${relativePath} */\n${cleanBody.trim()}\n`;
}

function minifyCss(source) {
    let output = '';
    let quote = '';
    let escaped = false;
    let inComment = false;

    for (let index = 0; index < source.length; index += 1) {
        const character = source[index];
        const next = source[index + 1];

        if (inComment) {
            if (character === '*' && next === '/') {
                inComment = false;
                index += 1;
            }
            continue;
        }

        if (quote) {
            output += character;
            if (escaped) {
                escaped = false;
            } else if (character === '\\') {
                escaped = true;
            } else if (character === quote) {
                quote = '';
            }
            continue;
        }

        if (character === '/' && next === '*') {
            inComment = true;
            index += 1;
            continue;
        }

        if (character === '"' || character === "'") {
            quote = character;
            output += character;
            continue;
        }

        if (/\s/.test(character)) {
            let lookahead = index + 1;
            while (lookahead < source.length && /\s/.test(source[lookahead])) lookahead += 1;
            const previous = output.at(-1) || '';
            const upcoming = source[lookahead] || '';
            /* Keep whitespace around + because CSS calc() requires it. */
            const punctuation = '{}:;,>~';
            if (previous && upcoming && !punctuation.includes(previous) && !punctuation.includes(upcoming)) {
                output += ' ';
            }
            index = lookahead - 1;
            continue;
        }

        output += character;
    }

    return output.trim().replace(/;}/g, '}');
}

try {
    const manifest = fs.readFileSync(sourcePath, 'utf8');
    const localImports = [];

    manifest.replace(importPattern, (_rule, importValue) => {
        if (isExternalImport(importValue)) {
            externalImports.add(importValue);
        } else {
            localImports.push(path.resolve(path.dirname(sourcePath), importValue));
        }
        return '';
    });

    if (!localImports.length) {
        throw new Error('No local @import statements found in lucUI.source.css');
    }

    const body = localImports.map(readStylesheet).filter(Boolean).join('\n');
    const remoteImports = [...externalImports].map(value => `@import url('${value}');`).join('\n');
    const banner = '/* lucUI v2.0.1 | MIT License | luca.ecosystem / luca.designss */';
    const bundle = `${banner}\n${remoteImports}${remoteImports ? '\n\n' : ''}${body}`;
    const minified = `${banner}\n${remoteImports}${remoteImports ? '\n' : ''}${minifyCss(body)}\n`;

    fs.writeFileSync(bundlePath, bundle);
    fs.writeFileSync(minifiedPath, minified);

    const bundleSize = (Buffer.byteLength(bundle) / 1024).toFixed(1);
    const minifiedSize = (Buffer.byteLength(minified) / 1024).toFixed(1);
    console.log(`Built lucUI.css (${visitedFiles.size} modules, ${bundleSize} kB)`);
    console.log(`Built lucUI.min.css (${minifiedSize} kB)`);
} catch (error) {
    console.error(error.message);
    process.exit(1);
}
