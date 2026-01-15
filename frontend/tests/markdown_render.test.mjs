import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const renderMarkdown = (content) =>
  renderToStaticMarkup(
    React.createElement(ReactMarkdown, {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [rehypeKatex],
      children: content,
    })
  );

const tableMarkdown = `
| Metric | Standard 70B Model (H100 GPU) | d-matrix SRAM + Lookup (Hybrid) | Improvement |
| :--- | :--- | :--- | :--- |
| First Token Latency | 20-40ms | <10ms | 2x-4x Faster |
| Throughput (Tokens/s) | ~150 T/s | 2,400 T/s | 16x Faster |
`;

const tableHtml = renderMarkdown(tableMarkdown);
assert.match(tableHtml, /<table>/, 'renders a table element');
assert.match(tableHtml, /<thead>/, 'renders a table head');
assert.match(tableHtml, /<tbody>/, 'renders a table body');

const mathMarkdown = 'Inline math: $E=mc^2$ and block:\n\n$$a^2 + b^2 = c^2$$\n';
const mathHtml = renderMarkdown(mathMarkdown);
assert.match(mathHtml, /class="katex"/, 'renders KaTeX output');

console.log('markdown render tests passed');
