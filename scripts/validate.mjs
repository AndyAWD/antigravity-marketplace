import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const pluginsDir = path.join(rootDir, 'plugins');

console.log('🔍 Validating all plugins in marketplace...\n');

const subdirs = fs.readdirSync(pluginsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

let total = 0;
let passed = 0;
let failed = 0;

for (const dirName of subdirs) {
  total++;
  const pluginPath = path.join(pluginsDir, dirName);
  try {
    const output = execSync(`agy plugin validate "${pluginPath}"`, { encoding: 'utf8' });
    console.log(output.trim());
    console.log('--------------------------------------------------');
    passed++;
  } catch (err) {
    console.error(`❌ Validation failed for ${dirName}:`);
    console.error(err.stdout || err.message);
    console.log('--------------------------------------------------');
    failed++;
  }
}

console.log(`\n📊 Summary: ${passed}/${total} plugins passed validation.`);
if (failed > 0) {
  process.exit(1);
}
