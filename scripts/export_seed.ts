import fs from 'fs';
import path from 'path';
import { MODELS } from '../src/data/models';
import { CATEGORIES } from '../src/data/categories';
import { ARTICLES } from '../src/data/articles';
import { COMPARISON_PRESETS, GENERAL_FAQS } from '../src/data/comparisons';

const output = {
  models: MODELS,
  categories: CATEGORIES,
  articles: ARTICLES,
  comparisons: COMPARISON_PRESETS,
  faqs: GENERAL_FAQS,
};

fs.writeFileSync(
  path.join(__dirname, 'v1_dump.json'),
  JSON.stringify(output, null, 2),
  'utf-8'
);

console.log(`Exported ${MODELS.length} models, ${CATEGORIES.length} categories, ${ARTICLES.length} articles, ${COMPARISON_PRESETS.length} comparisons, ${GENERAL_FAQS.length} faqs.`);
