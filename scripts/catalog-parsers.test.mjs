import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseCsv, parsePrice, rowsToRecords, rowsToContent, slugify, formatPrice } from '../lib/signage/parsers.js';

test('CSV parser preserves quoted commas, escaped quotes, multiline fields, and trailing cells', () => {
  assert.deepEqual(parseCsv('Product,Notes,Price\r\n"Banner, 13oz","Say ""Hello""\r\nSecond line",49\r\nFlag,,\r\n'), [
    ['Product', 'Notes', 'Price'],
    ['Banner, 13oz', 'Say "Hello"\nSecond line', '49'],
    ['Flag', '', ''],
  ]);
  assert.deepEqual(parseCsv('A,B\n1,2'), [['A', 'B'], ['1', '2']]);
  assert.deepEqual(parseCsv(''), []);
});

test('catalog headers tolerate column order, casing, BOM, and missing optional columns', () => {
  const rows = parseCsv('\uFEFF PRODUCT , Price – Double-Sided ,CATEGORY,Price - Single-Sided\n Banner ,$99, Banners ,$49');
  assert.deepEqual(rowsToRecords(rows), [{ image: '', category: 'Banners', product: 'Banner', size: '', single: '$49', double: '$99', mode: '', notes: '', alt: '' }]);
  assert.deepEqual(rowsToRecords([]), []);
});

test('missing and non-numeric prices never become free prices', () => {
  for (const value of [null, undefined, '', ' ', '—', '–', 'Call for quote', 'Infinity']) assert.equal(parsePrice(value), null);
  assert.equal(parsePrice(' $1,234.50 '), 1234.5);
  assert.equal(formatPrice(1234.5), '$1,234.50');
  assert.equal(formatPrice(null), null);
  assert.equal(formatPrice(NaN), null);
});

test('content feed keeps complete specs and FAQs, omits incomplete entries', () => {
  const rows = [
    ['Product', 'H1', 'Highlights', 'Perfect For', 'Spec Group 1 Title', 'Spec Group 1 Items', 'Spec Group 2 Title', 'FAQ 1 Q', 'FAQ 1 A', 'FAQ 2 Q'],
    ['Vinyl & Mesh Banners', 'Custom Banners', 'Durable | Outdoor | ', 'Events | Shops', 'Material', '13oz | Vinyl', 'Incomplete', 'Can it go outside?', 'Yes.', 'Missing answer'],
    ['', '', '', '', '', '', '', '', '', ''],
  ];
  const result = rowsToContent(rows);
  assert.equal(result.length, 1);
  assert.equal(result[0].slug, 'vinyl-and-mesh-banners');
  assert.deepEqual(result[0].highlights, ['Durable', 'Outdoor']);
  assert.deepEqual(result[0].specGroups, [{ title: 'Material', items: ['13oz', 'Vinyl'] }]);
  assert.deepEqual(result[0].faqs, [{ question: 'Can it go outside?', answer: 'Yes.' }]);
  assert.deepEqual(rowsToContent([]), []);
});

test('catalog slug normalization preserves existing route convention', () => {
  assert.equal(slugify('  Rigid & Metal Signs!  '), 'rigid-and-metal-signs');
  assert.equal(slugify('13oz---Vinyl Banner'), '13oz-vinyl-banner');
});
