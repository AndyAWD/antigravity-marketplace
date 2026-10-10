import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const pluginsDir = path.join(rootDir, 'plugins');

console.log('🔄 Building Marketplace Catalog...');

const subdirs = fs.readdirSync(pluginsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

const catalogPlugins = [];
const pluginEntries = [];

for (const dirName of subdirs) {
  const pluginPath = path.join(pluginsDir, dirName);
  const manifestPath = path.join(pluginPath, 'plugin.json');
  const packageJsonPath = path.join(pluginPath, 'package.json');

  if (!fs.existsSync(manifestPath)) {
    console.warn(`⚠️ Skipping ${dirName}: No plugin.json found.`);
    continue;
  }

  let manifest = {};
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch (err) {
    console.error(`❌ Error parsing plugin.json in ${dirName}:`, err);
    continue;
  }

  let pkg = {};
  if (fs.existsSync(packageJsonPath)) {
    try {
      pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    } catch {
      // Ignore package.json parsing error
    }
  }

  // Detect components
  const components = [];
  if (fs.existsSync(path.join(pluginPath, 'skills'))) components.push('skills');
  if (fs.existsSync(path.join(pluginPath, 'agents'))) components.push('agents');
  if (fs.existsSync(path.join(pluginPath, 'commands'))) components.push('commands');
  if (fs.existsSync(path.join(pluginPath, 'mcp_config.json'))) components.push('mcpServers');
  if (fs.existsSync(path.join(pluginPath, 'hooks.json'))) components.push('hooks');
  if (fs.existsSync(path.join(pluginPath, 'rules'))) components.push('rules');

  const pluginName = manifest.name || dirName;
  const displayName = manifest.displayName || dirName;
  const version = manifest.version || pkg.version || '0.1.0';
  const description = manifest.description || pkg.description || '';
  const repository = manifest.repository || pkg.repository?.url || `https://github.com/AndyAWD/${dirName}`;
  const repoUrl = typeof repository === 'string' ? repository.replace(/^git\+/, '').replace(/\.git$/, '') : repository.url;

  const pluginEntry = {
    name: pluginName,
    displayName,
    version,
    description,
    author: manifest.author || pkg.author || 'AndyAWD',
    license: manifest.license || pkg.license || 'MIT',
    repository: repoUrl,
    components,
    keywords: manifest.keywords || pkg.keywords || ['antigravity', 'plugin'],
    source: {
      type: 'git',
      url: `${repoUrl}.git`,
      path: `plugins/${dirName}`
    }
  };

  if (manifest.suggestedPrompts && Array.isArray(manifest.suggestedPrompts)) {
    pluginEntry.suggestedPrompts = manifest.suggestedPrompts;
  }

  if (manifest.logo) {
    pluginEntry.logo = manifest.logo;
  }

  catalogPlugins.push(pluginEntry);
  pluginEntries.push({ path: `plugins/${dirName}` });
}

// Write marketplace.json
const marketplaceData = {
  name: 'andyawd-marketplace',
  displayName: "AndyAWD's Antigravity Plugins Marketplace",
  description: 'Curated collection of high-productivity Google Antigravity (AGY) plugins, skills, hooks, and MCP servers.',
  version: '1.0.0',
  homepage: 'https://github.com/AndyAWD/antigravity-marketplace',
  repository: 'https://github.com/AndyAWD/antigravity-marketplace.git',
  updatedAt: new Date().toISOString(),
  pluginCount: catalogPlugins.length,
  plugins: catalogPlugins
};

const marketplaceJsonPath = path.join(rootDir, 'marketplace.json');
fs.writeFileSync(marketplaceJsonPath, JSON.stringify(marketplaceData, null, 2) + '\n', 'utf8');
console.log(`✅ marketplace.json generated with ${catalogPlugins.length} plugins.`);

// Write plugins.json
const pluginsJsonData = {
  $schema: 'https://json.schemastore.org/antigravity-plugins.json',
  entries: pluginEntries
};

const pluginsJsonPath = path.join(rootDir, 'plugins.json');
fs.writeFileSync(pluginsJsonPath, JSON.stringify(pluginsJsonData, null, 2) + '\n', 'utf8');
console.log(`✅ plugins.json synchronized.`);
