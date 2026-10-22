// Turns the client build in dist/ into static HTML per route so crawlers and
// link-preview bots get real content without running JavaScript.
// Run after `vite build` and `vite build --ssr src/entry-server.tsx --outDir dist-server`.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const serverEntry = path.join(root, 'dist-server', 'entry-server.js');

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8');
const { render, PRERENDER_PATHS } = await import(pathToFileURL(serverEntry).href);

// React 19 emits <title>, <meta> and <link> rendered inside components at the
// start of the output. They belong in <head>, so they are lifted out of the body.
const HEAD_TAG = /^(?:<title[^>]*>[\s\S]*?<\/title>|<meta\b[^>]*\/?>|<link\b[^>]*\/?>)/;

function splitHead(html) {
  const tags = [];
  let rest = html;
  for (let match = rest.match(HEAD_TAG); match; match = rest.match(HEAD_TAG)) {
    tags.push(match[0]);
    rest = rest.slice(match[0].length);
  }
  return { headTags: tags, body: rest };
}

function markPrerendered(tag) {
  return tag.replace(/^<(title|meta|link)\b/, '<$1 data-prerender=""');
}

function buildPage(appHtml) {
  const { headTags, body } = splitHead(appHtml);
  const lang = (appHtml.match(/<html[^>]*lang="([^"]+)"/) || [])[1];

  let page = template
    // The template's generic title/description are replaced by the page's own.
    .replace(/\s*<title>[\s\S]*?<\/title>/, '')
    .replace(/\s*<meta name="description"[^>]*>/, '')
    .replace('</head>', `    ${headTags.map(markPrerendered).join('\n    ')}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  if (lang) page = page.replace(/<html lang="[^"]*">/, `<html lang="${lang}">`);
  return page;
}

function outFile(routePath) {
  return routePath === '/'
    ? path.join(dist, 'index.html')
    : path.join(dist, routePath.replace(/^\//, ''), 'index.html');
}

for (const routePath of PRERENDER_PATHS) {
  const { html, status } = await render(routePath);
  if (status !== 200) throw new Error(`${routePath} rendered with status ${status}`);
  const file = outFile(routePath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, buildPage(html));
  console.log(`prerendered ${routePath} -> ${path.relative(root, file)}`);
}

// Served by the web server with a real 404 status for unknown URLs.
const notFound = await render('/__not-found__');
fs.writeFileSync(path.join(dist, '404.html'), buildPage(notFound.html));
console.log(`prerendered 404 -> dist/404.html (status ${notFound.status})`);

fs.rmSync(path.join(root, 'dist-server'), { recursive: true, force: true });
