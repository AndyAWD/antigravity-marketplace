import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const catalogPath = path.join(rootDir, 'marketplace.json');

if (!fs.existsSync(catalogPath)) {
  console.error('❌ marketplace.json not found. Please run `npm run sync` first.');
  process.exit(1);
}

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const plugins = catalog.plugins || [];
const args = process.argv.slice(2);

const isList = args.includes('--list') || args.includes('-l');
const isAll = args.includes('--all') || args.includes('-a');
const target = args.find((a) => !a.startsWith('-'));

console.log(`🏛  AndyAWD Antigravity Marketplace Installer (${catalog.name} v${catalog.version})\n`);

if (isList || (!isAll && !target)) {
  console.log('📦 Curated Plugins Catalog:\n');
  plugins.forEach((p, idx) => {
    console.log(`  ${idx + 1}. \x1b[36m${p.name}\x1b[0m (v${p.version})`);
    console.log(`     📝 ${p.description}`);
    console.log(`     🔗 ${p.repository}`);
    console.log(`     💻 ${p.installCommand}\n`);
  });
  console.log('💡 Usage:');
  console.log('   node scripts/install.mjs <plugin-name>    Install a specific plugin');
  console.log('   node scripts/install.mjs --all            Install all plugins in catalog');
  process.exit(0);
}

const toInstall = isAll
  ? plugins
  : plugins.filter((p) => p.name === target || p.repository.toLowerCase().includes(target.toLowerCase()));

if (toInstall.length === 0) {
  console.error(`❌ No plugin found matching "${target}". Run \`node scripts/install.mjs --list\` to see available plugins.`);
  process.exit(1);
}

console.log(`🚀 Preparing to install ${toInstall.length} plugin(s) via agy CLI...\n`);

let success = 0;
for (const p of toInstall) {
  console.log(`⏳ Installing \x1b[36m${p.name}\x1b[0m from ${p.repository}...`);
  try {
    const cmd = `agy plugin install ${p.repository}`;
    const output = execSync(cmd, { encoding: 'utf8' });
    console.log(`   ✔ ${output.trim()}`);
    success++;
  } catch (err) {
    console.error(`   ❌ Failed to install ${p.name}:`);
    console.error(`      ${err.stdout ? err.stdout.trim() : err.message}`);
  }
}

console.log(`\n🎉 Processed ${success}/${toInstall.length} plugin(s).`);
console.log('💡 Run `agy plugin list` to verify imported plugins.');
