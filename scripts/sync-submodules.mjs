import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🔄 Synchronizing all submodules to latest upstream commits...');

try {
  execSync('git submodule update --init --recursive --remote', {
    cwd: rootDir,
    stdio: 'inherit'
  });
  console.log('\n✅ All submodules updated successfully.');
  console.log('🔄 Rebuilding catalog...');
  execSync('node scripts/build-catalog.mjs', {
    cwd: rootDir,
    stdio: 'inherit'
  });
} catch (err) {
  console.error('❌ Failed to update submodules:', err.message);
  process.exit(1);
}
