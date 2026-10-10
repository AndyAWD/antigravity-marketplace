import { execSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const pluginsDir = path.join(rootDir, 'plugins');

const args = process.argv.slice(2);
const modeInherit = args.includes('--inherit');
const specificPlugin = args.find((a) => !a.startsWith('--'));

console.log('🚀 Antigravity Marketplace Installer\n');

if (modeInherit) {
  // Mode: Declarative Inherit via ~/.gemini/config/plugins.json
  const userHome = os.homedir();
  const geminiConfigDir = path.join(userHome, '.gemini', 'config');
  const globalPluginsJson = path.join(geminiConfigDir, 'plugins.json');

  if (!fs.existsSync(geminiConfigDir)) {
    fs.mkdirSync(geminiConfigDir, { recursive: true });
  }

  let config = { inherits: [], entries: [] };
  if (fs.existsSync(globalPluginsJson)) {
    try {
      config = JSON.parse(fs.readFileSync(globalPluginsJson, 'utf8'));
    } catch {
      config = { inherits: [], entries: [] };
    }
  }

  if (!Array.isArray(config.inherits)) {
    config.inherits = [];
  }

  const marketplacePluginsJson = path.join(rootDir, 'plugins.json').replace(/\\/g, '/');
  const alreadyInherited = config.inherits.some((item) => item.path === marketplacePluginsJson);

  if (!alreadyInherited) {
    config.inherits.push({ path: marketplacePluginsJson });
    fs.writeFileSync(globalPluginsJson, JSON.stringify(config, null, 2) + '\n', 'utf8');
    console.log(`✅ Successfully added marketplace to global plugins.json inherits:`);
    console.log(`   Path: ${marketplacePluginsJson}`);
    console.log(`   Config: ${globalPluginsJson}`);
  } else {
    console.log(`ℹ️ Marketplace is already registered in global plugins.json inherits.`);
  }

  console.log('\n🎉 Declarative configuration complete! All marketplace plugins are now active.');
  process.exit(0);
}

// Mode: Batch Install via `agy plugin install <path>`
const subdirs = fs.readdirSync(pluginsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .filter((name) => !specificPlugin || name === specificPlugin || name.includes(specificPlugin))
  .sort();

if (subdirs.length === 0) {
  console.error(`❌ No matching plugins found${specificPlugin ? ` for "${specificPlugin}"` : ''}.`);
  process.exit(1);
}

console.log(`📦 Found ${subdirs.length} plugin(s) to install...\n`);

let successCount = 0;
for (const dirName of subdirs) {
  const pluginPath = path.join(pluginsDir, dirName);
  console.log(`⏳ Installing "${dirName}"...`);
  try {
    const output = execSync(`agy plugin install "${pluginPath}"`, { encoding: 'utf8' });
    console.log(`   ✔ ${output.trim()}`);
    successCount++;
  } catch (err) {
    console.error(`   ❌ Failed to install ${dirName}:`);
    console.error(`      ${err.stdout ? err.stdout.trim() : err.message}`);
  }
}

console.log(`\n🎉 Installation finished: ${successCount}/${subdirs.length} plugin(s) processed.`);
console.log('💡 Tip: Run `agy plugin list` to verify all installed plugins.');
console.log('💡 Tip: Use `node scripts/install-all.mjs --inherit` for zero-copy declarative linking.');
