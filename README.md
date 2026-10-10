# antigravity-marketplace

English | [繁體中文](README.zh-TW.md)

A curated, unified marketplace registry hub for **Google Antigravity (AGY)** plugins. This repository allows you to discover, inspect, and install 8 high-productivity plugins created by AndyAWD.

This marketplace is designed with a **Pure Catalog Registry** architecture—matching the mechanism used by the official marketplace. It records only plugin metadata and source GitHub repository endpoints, **without embedding submodules or source code**. Plugin maintainers develop and release versions within their respective repositories, completely eliminating two-repository maintenance overhead.

All plugins curated in this marketplace fully support the three core Google Antigravity platforms: the Antigravity Command-Line Interface (CLI, `agy`), the Antigravity Integrated Development Environment (IDE), and the Antigravity 2.0 Desktop Application.

## How to Install

Install any plugin curated in this marketplace directly via the Antigravity CLI:

```bash
agy plugin install https://github.com/AndyAWD/<plugin-name>
```

For example, to install the CLI statusline customization plugin:

```bash
agy plugin install https://github.com/AndyAWD/antigravity-cli-statusline
```

If you wish to install all 8 curated plugins at once, clone this repository and run:

```bash
npm run install:all
```

## Key Features

1. **Cross-Platform Compatibility**: Fully verified and seamlessly compatible across the CLI terminal environment, IDE sidebar, and 2.0 Desktop interface.
2. **Zero Maintenance Overhead**: Pure catalog registry architecture with no embedded submodules. Plugins are developed and released independently in their own repositories.
3. **8 Curated High-Productivity Plugins**: Covers CLI statusline customization, dual Git workflows, read-only Google Drive integration, task state persistence, Chinese typography formatting, official knowledge base assistant, and documentation templates.
4. **100% Official Specification Validation**: Every plugin passes rigorous `agy plugin validate` verification, ensuring full compatibility with Lifecycle Hooks, Model Context Protocol (MCP) servers, Skills, and Rules.
5. **Native CLI Compatibility**: Directly installable via `agy plugin install <github-url>` with zero third-party package managers required.

## How to Manage and Toggle Plugins

• List installed plugins:

  ```bash
  agy plugin list
  ```

• Install a plugin:

  ```bash
  agy plugin install <plugin-url>
  ```

• Enable a plugin:

  ```bash
  agy plugin enable <plugin-name>
  ```

• Disable a plugin:

  ```bash
  agy plugin disable <plugin-name>
  ```

• Uninstall a plugin:

  ```bash
  agy plugin uninstall <plugin-name>
  ```

## Project Structure

```text
antigravity-marketplace/
├── marketplace.json
├── package.json
├── LICENSE
├── README.md
├── README.zh-TW.md
└── scripts/
    ├── install.mjs
    └── sync-catalog.mjs
```

## Commands and Skills

Directory of the 8 curated plugins and their primary slash commands:

### 1. Curated Plugins Catalog Overview

| Plugin | Version | Description | Install Command |
| :--- | :---: | :--- | :--- |
| **`antigravity-cli-statusline`** | `v1.8.0` | Customizes CLI statusline with real-time quota, token, model, and git branch metrics. | `agy plugin install https://github.com/AndyAWD/antigravity-cli-statusline` |
| **`antigravity-github-flow`** | `v0.1.0` | Lightweight GitHub Flow with Conventional Commits, bilingual PR descriptions, and Releases. | `agy plugin install https://github.com/AndyAWD/antigravity-github-flow` |
| **`antigravity-git-flow`** | `v0.1.0` | Standard Git Flow branching workflows with Conventional Commits. | `agy plugin install https://github.com/AndyAWD/antigravity-git-flow` |
| **`antigravity-google-drive`** | `v0.1.0` | Read-only Google Drive integration with file search and automatic Markdown export. | `agy plugin install https://github.com/AndyAWD/antigravity-google-drive` |
| **`antigravity-state`** | `v0.1.0` | Long-horizon task state persistence and progress tracking via `STATE.md`. | `agy plugin install https://github.com/AndyAWD/antigravity-state` |
| **`antigravity-chinese-copywriting`** | `v1.0.0` | Typography formatting following sparanoid guidelines (CJK-English spacing, punctuation). | `agy plugin install https://github.com/AndyAWD/antigravity-chinese-copywriting` |
| **`antigravity-help-agent`** | `v1.1.0` | Official knowledge base assistant for the entire Google Antigravity ecosystem. | `agy plugin install https://github.com/AndyAWD/antigravity-help-agent` |
| **`antigravity-doc-template`** | `v1.0.0` | Standard documentation template suite and generators (bilingual README / PR templates). | `agy plugin install https://github.com/AndyAWD/antigravity-doc-template` |

### 2. Statusline Customization

```text
/antigravity-cli-statusline:agy-cli-statusline
```

- **When to Use**: Configure the metrics, ordering, and interface language (zh-tw / zh-cn / en / jp) displayed in the CLI statusline.
- **How It Works**:
  1. Presents an interactive selector for choosing metrics (quota, token usage, model, git branch, RAM, etc.).
  2. Deploys cross-platform lifecycle hooks and registers configuration entries automatically.

### 3. Conventional Commits & GitHub Flow

```text
/antigravity-github-flow:commit
```

- **When to Use**: Analyze workspace changes and generate Conventional Commits automatically.
- **How It Works**:
  1. Inspects staged and unstaged working directory modifications.
  2. Automatically breaks down independent tasks into separate commits.
  3. Appends official co-author trailers.

### 4. Bilingual Pull Request Generator

```text
/antigravity-github-flow:github-pr
```

- **When to Use**: Open and document Pull Requests on GitHub with standardized templates.
- **How It Works**:
  1. Prompts for language preference (Traditional Chinese, English, or bilingual).
  2. Compares branch changes against main.
  3. Produces formatted PR titles and descriptions with optional GitHub CLI creation.

### 5. Long-Horizon Task State Management

```text
/antigravity-state:agy-state
```

- **When to Use**: Persist task progress into `STATE.md` across conversation resets, model switches, or large refactoring steps.
- **How It Works**:
  1. Evaluates overall objectives, completed milestones, and pending subgoals.
  2. Writes current status and next actions to `STATE.md` at project root.

### 6. Read-Only Google Drive Integration

```text
/antigravity-google-drive:agy-google-drive
```

- **When to Use**: Search, inspect, and read files in shared Google Drive folders securely.
- **How It Works**:
  1. Connects to designated shared folders via Google Cloud Service Account credentials.
  2. Searches files and exports Google Docs and Sheets to clean Markdown text.

### 7. Chinese Typography Formatting

```text
/antigravity-chinese-copywriting:agy-chinese-copywriting
```

- **When to Use**: Proofread and format Markdown documents with professional typography.
- **How It Works**:
  1. Injects spaces between CJK and Latin characters/numbers according to sparanoid guidelines.
  2. Normalizes punctuation to full-width and fixes proper-noun casing.

### 8. Google Antigravity Knowledge Base Assistant

```text
/antigravity-help:agy-help
```

- **When to Use**: Inquire about Antigravity specifications, customization architecture, or troubleshooting.
- **How It Works**:
  1. Launches the official specification audit assistant.
  2. Retrieves verified documentation based on the Positive Affirmative Protocol.

---

### 🛠 Maintainer Guide

Maintainers can keep the catalog synchronized with upstream releases using:

• Synchronize upstream versions and manifests:

  ```bash
  npm run sync
  ```

  Concurrently fetches latest metadata from all 8 plugin repositories on GitHub and regenerates `marketplace.json`.

## License

This marketplace is licensed under the [MIT License](LICENSE). Refer to individual plugin repositories for their respective licenses.
