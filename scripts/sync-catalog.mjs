import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const repositories = [
  'AndyAWD/antigravity-cli-statusline',
  'AndyAWD/antigravity-git-flow',
  'AndyAWD/antigravity-github-flow',
  'AndyAWD/antigravity-google-drive',
  'AndyAWD/antigravity-state',
  'AndyAWD/antigravity-chinese-copywriting',
  'AndyAWD/antigravity-help-agent',
  'AndyAWD/antigravity-doc-template'
];

console.log('🌐 Fetching latest metadata from GitHub repositories...\n');

async function fetchJson(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Antigravity-Marketplace-Sync/1.0',
        Accept: 'application/json'
      }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function syncCatalog() {
  const catalogPlugins = [];

  for (const repo of repositories) {
    const rawBase = `https://raw.githubusercontent.com/${repo}/main`;
    
    // Fetch plugin.json
    let pluginJson = await fetchJson(`${rawBase}/plugin.json`);
    if (!pluginJson) {
      pluginJson = await fetchJson(`https://raw.githubusercontent.com/${repo}/master/plugin.json`);
    }

    // Fetch package.json
    let packageJson = await fetchJson(`${rawBase}/package.json`);
    if (!packageJson) {
      packageJson = await fetchJson(`https://raw.githubusercontent.com/${repo}/master/package.json`);
    }

    const shortName = repo.split('/')[1];
    const pluginName = pluginJson?.name || shortName;
    const displayName = pluginJson?.displayName || pluginName;
    const version = pluginJson?.version || packageJson?.version || '1.0.0';
    const description = pluginJson?.description || packageJson?.description || '';
    const repoUrl = `https://github.com/${repo}`;

    const pluginEntry = {
      name: pluginName,
      displayName,
      version,
      description,
      author: pluginJson?.author || packageJson?.author || 'AndyAWD',
      license: pluginJson?.license || packageJson?.license || 'MIT',
      repository: repoUrl,
      keywords: pluginJson?.keywords || packageJson?.keywords || ['antigravity', 'plugin'],
      installCommand: `agy plugin install ${repoUrl}`
    };

    if (pluginJson?.suggestedPrompts) {
      pluginEntry.suggestedPrompts = pluginJson.suggestedPrompts;
    }
    if (pluginJson?.logo) {
      pluginEntry.logo = pluginJson.logo;
    }

    catalogPlugins.push(pluginEntry);
    console.log(`✔ ${pluginName} (v${version}) from ${repo}`);
  }

  const marketplaceData = {
    name: 'andyawd-marketplace',
    displayName: "AndyAWD's Antigravity Plugins Marketplace",
    description: 'Curated pure catalog registry of Google Antigravity (AGY) plugins by AndyAWD.',
    version: '1.0.0',
    homepage: 'https://github.com/AndyAWD/antigravity-marketplace',
    repository: 'https://github.com/AndyAWD/antigravity-marketplace.git',
    updatedAt: new Date().toISOString(),
    pluginCount: catalogPlugins.length,
    plugins: catalogPlugins
  };

  const marketplaceJsonPath = path.join(rootDir, 'marketplace.json');
  fs.writeFileSync(marketplaceJsonPath, JSON.stringify(marketplaceData, null, 2) + '\n', 'utf8');
  console.log(`\n✅ marketplace.json successfully generated with ${catalogPlugins.length} plugins.`);
}

syncCatalog().catch((err) => {
  console.error('❌ Failed to sync catalog:', err);
  process.exit(1);
});
