# AndyAWD Google Antigravity Plugins Marketplace

[繁體中文](./README.zh-TW.md) | English

A curated, unified marketplace and distribution hub for **Google Antigravity (AGY)** plugins. This repository aggregates, validates, and manages a suite of high-productivity plugins created by AndyAWD, enabling one-click batch installation and declarative configuration sharing across projects and teams.

---

## 🌟 Catalog Overview

The marketplace currently curates 8 plugins:

| Plugin | Version | Components | Description | Repository |
| :--- | :---: | :--- | :--- | :--- |
| **`antigravity-cli-statusline`** | `v1.8.0` | `skills`, `hooks` | Customizes the Antigravity CLI statusline (footer) with real-time API quota, token usage, context window, model name, git branch, and memory metrics. | [GitHub](https://github.com/AndyAWD/antigravity-cli-statusline) |
| **`antigravity-github-flow`** | `v0.1.0` | `skills` | Lightweight GitHub Flow automation: Conventional Commits, bilingual PR descriptions, GitHub Releases, and README synchronization. | [GitHub](https://github.com/AndyAWD/antigravity-github-flow) |
| **`antigravity-git-flow`** | `v0.1.0` | `skills` | Standard Git Flow (main / develop / feature / release / hotfix) branching workflows with Conventional Commits. | [GitHub](https://github.com/AndyAWD/antigravity-git-flow) |
| **`antigravity-google-drive`** | `v0.1.0` | `skills`, `mcpServers`, `rules` | Read-only Google Drive integration for searching and reading files, with auto-export of Google Docs/Sheets into Markdown. | [GitHub](https://github.com/AndyAWD/antigravity-google-drive) |
| **`antigravity-state`** | `v0.1.0` | `skills`, `hooks` | Long-horizon task state persistence and tracking via `STATE.md` at project root across conversation sessions. | [GitHub](https://github.com/AndyAWD/antigravity-state) |
| **`antigravity-chinese-copywriting`** | `v1.0.0` | `skills`, `rules` | Automatic typography formatting following sparanoid guidelines (proper CJK-English spacing, full-width punctuation, proper-noun casing). | [GitHub](https://github.com/AndyAWD/antigravity-chinese-copywriting) |
| **`antigravity-help-agent`** | `v1.1.0` | `skills`, `agents` | Official knowledge base and interactive assistant for the entire Google Antigravity ecosystem (CLI, IDE, Desktop, SDK, and Customizations). | [GitHub](https://github.com/AndyAWD/antigravity-help-agent) |
| **`antigravity-doc-template`** | `v1.0.0` | `skills`, `templates` | Standard documentation template suite and AI generators for Antigravity plugins. | [GitHub](https://github.com/AndyAWD/antigravity-doc-template) |

---

## 🚀 Installation & Usage

### Option 1: Declarative Inherit (Recommended ⭐️)

Antigravity features native declarative inheritance. You can mount all plugins without duplicating files on disk by referencing `plugins.json`:

Run the built-in registrar:
```bash
node scripts/install-all.mjs --inherit
```

Or manually add this to your global `~/.gemini/config/plugins.json` (or project `.agents/plugins.json`):
```json
{
  "inherits": [
    {
      "path": "D:/Project/antigravity-marketplace/plugins.json"
    }
  ]
}
```

---

### Option 2: Batch Local Installation

To install all plugins directly into `~/.gemini/config/plugins/` and register them in Antigravity's `import_manifest.json`:

```bash
# Install all plugins
npm run install:all

# Or install a specific plugin
node scripts/install-all.mjs antigravity-google-drive
```

Verify your installed plugins at any time:
```bash
agy plugin list
```

---

### Option 3: Per-Project Scope

To use this marketplace exclusively within a specific project, add the reference to `.agents/plugins.json` at the root of that project:

```json
{
  "inherits": [
    {
      "path": "/absolute/path/to/antigravity-marketplace/plugins.json"
    }
  ]
}
```

---

## 🛠 Automation Commands

| Command | Action | Description |
| :--- | :--- | :--- |
| `npm run validate` | `node scripts/validate.mjs` | Batch validation of all plugins via `agy plugin validate`. |
| `npm run sync` | `node scripts/sync-submodules.mjs` | Pulls latest upstream commits for all git submodules and regenerates catalog. |
| `npm run build` | `node scripts/build-catalog.mjs` | Scans `plugins/` directory and generates updated `marketplace.json` and `plugins.json`. |
| `npm run install:all` | `node scripts/install-all.mjs` | Runs `agy plugin install` for all plugins in the marketplace. |
| `npm run status` | `git submodule status` | Checks commit SHA and tag status of each plugin submodule. |

---

## 📁 Repository Structure

```text
antigravity-marketplace/
├── .gitmodules                     # Git submodule configurations
├── marketplace.json                # Official marketplace catalog manifest
├── plugins.json                    # Antigravity declarative plugins manifest
├── package.json                    # Scripts and dependencies
├── scripts/                        # Automation toolchain
│   ├── build-catalog.mjs           # Catalog generator
│   ├── install-all.mjs             # Batch installer and declarative registrar
│   ├── sync-submodules.mjs         # Submodule sync utility
│   └── validate.mjs                # Batch validator
├── plugins/                        # Submodule directories
│   ├── antigravity-cli-statusline/
│   ├── antigravity-git-flow/
│   ├── antigravity-github-flow/
│   ├── antigravity-google-drive/
│   ├── antigravity-state/
│   ├── antigravity-chinese-copywriting/
│   ├── antigravity-help-agent/
│   └── antigravity-doc-template/
├── README.md                       # English documentation
└── README.zh-TW.md                 # Traditional Chinese documentation
```

---

## 📄 License

MIT License. See [LICENSE](./LICENSE) for details.
