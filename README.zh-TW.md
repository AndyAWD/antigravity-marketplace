# AndyAWD Google Antigravity 外掛市集（Plugins Marketplace）

繁體中文 | [English](./README.md)

本儲存庫為 **Google Antigravity（AGY）** 專屬的自建外掛市集聚合中心（Plugins Marketplace Hub）。透過此市集，您可以統一管理、批次驗證、一鍵安裝或以宣告式設定直接引用 AndyAWD 開發的一系列高品質 Antigravity 外掛程式（Plugins）。

---

## 🌟 收錄外掛總覽（Catalog）

市集目前精選收錄以下 8 款高生產力外掛程式：

| 外掛名稱 | 最新版本 | 支援組件 | 主要功能說明 | 來源儲存庫 |
| :--- | :---: | :--- | :--- | :--- |
| **`antigravity-cli-statusline`** | `v1.8.0` | `skills`, `hooks` | 命令列介面（CLI）狀態列（Statusline / Footer）客製化，即時顯示應用程式介面（API）配額、權杖（Token）消耗、上下文視窗（Context Window）、模型、Git 分支與記憶體用量。 | [GitHub](https://github.com/AndyAWD/antigravity-cli-statusline) |
| **`antigravity-github-flow`** | `v0.1.0` | `skills` | 輕量化 GitHub Flow 工作流程，支援慣例式提交（Conventional Commits）、拉取請求（Pull Request）雙語說明生成、GitHub Release 發布與文件同步。 | [GitHub](https://github.com/AndyAWD/antigravity-github-flow) |
| **`antigravity-git-flow`** | `v0.1.0` | `skills` | 標準 Git Flow（main / develop / feature / release / hotfix）分支策略自動化管理與慣例式提交。 | [GitHub](https://github.com/AndyAWD/antigravity-git-flow) |
| **`antigravity-google-drive`** | `v0.1.0` | `skills`, `mcpServers`, `rules` | Google 雲端硬碟（Google Drive）唯讀存取外掛，支援跨檔案搜尋、閱讀，並自動將 Google 文件與試算表匯出為純文字與 Markdown。 | [GitHub](https://github.com/AndyAWD/antigravity-google-drive) |
| **`antigravity-state`** | `v0.1.0` | `skills`, `hooks` | 長程多步驟任務狀態管理，透過專案根目錄的 `STATE.md` 跨對話會話持續追蹤子目標與里程碑進度。 | [GitHub](https://github.com/AndyAWD/antigravity-state) |
| **`antigravity-chinese-copywriting`** | `v1.0.0` | `skills`, `rules` | 中文文案排版規範（遵循 sparanoid 規範），自動於中英文與數字之間插入空格、校正全形標點符號與專有名詞大小寫。 | [GitHub](https://github.com/AndyAWD/antigravity-chinese-copywriting) |
| **`antigravity-help-agent`** | `v1.1.0` | `skills`, `agents` | Google Antigravity 原廠知識庫與生態系問答助理，涵蓋 CLI、IDE、Desktop、Python SDK 與各項客製化機制。 | [GitHub](https://github.com/AndyAWD/antigravity-help-agent) |
| **`antigravity-doc-template`** | `v1.0.0` | `skills`, `templates` | 外掛標準說明文件範本庫與生成器，內建 README 雙語範本、PR 範本、Release 範本與自動化同步技能。 | [GitHub](https://github.com/AndyAWD/antigravity-doc-template) |

---

## 🚀 快速安裝與使用方式

本市集支援多種整合途徑，您可以根據個人或團隊需求選擇最適合的方式：

### 方式 1：宣告式繼承（零複製引用，最推薦 ⭐️）

Antigravity 內建標準宣告式客製化機制。您只需將本市集的 `plugins.json` 加入至您的全域設定檔，即可在毋須複製檔案的情況下即時啟用所有外掛：

執行市集內建的自動註冊腳本：
```bash
node scripts/install-all.mjs --inherit
```

或者手動編輯您的全域外掛設定檔 `~/.gemini/config/plugins.json`（若無此檔案可自行建立）：
```json
{
  "inherits": [
    {
      "path": "D:/Project/antigravity-marketplace/plugins.json"
    }
  ]
}
```

> [!TIP]
> 採用宣告式繼承時，當市集更新或切換分支時，所有專案會即刻自動套用最新外掛，不佔用額外磁碟空間！

---

### 方式 2：一鍵批次安裝到本地環境

若您習慣將外掛實體匯入至 Antigravity 原廠外掛目錄（`~/.gemini/config/plugins/`）並註冊至 `import_manifest.json`：

```bash
# 一鍵安裝市集內的所有外掛
npm run install:all

# 或是安裝單一特定外掛（例如僅安裝 Google Drive 外掛）
node scripts/install-all.mjs antigravity-google-drive
```

安裝完成後，可執行以下指令檢查已匯入之外掛狀態：
```bash
agy plugin list
```

---

### 方式 3：在特定專案中局部使用（Project-level）

若您只想在特定專案中啟用本市集的外掛，只需在該專案根目錄下的 `.agents/plugins.json` 加入繼承設定：

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

## 🛠 自動化管理指令

市集內建完整的 Node.js 管理工具鏈，方便維護者與使用者進行版本控制：

| npm 指令 | 對應動作 | 說明 |
| :--- | :--- | :--- |
| `npm run validate` | `node scripts/validate.mjs` | 調用 `agy plugin validate` 批次驗證所有外掛的合規性與完整度。 |
| `npm run sync` | `node scripts/sync-submodules.mjs` | 遞迴拉取所有子模組（Submodules）遠端最新提交（Commits），並自動重新產生目錄。 |
| `npm run build` | `node scripts/build-catalog.mjs` | 重新掃描 `plugins/` 目錄，動態產生最新的 `marketplace.json` 與 `plugins.json`。 |
| `npm run install:all`| `node scripts/install-all.mjs` | 透過原廠 `agy plugin install` 指令批次安裝市集所有外掛至本機環境。 |
| `npm run status` | `git submodule status` | 檢視各個外掛子模組目前的版本標記與提交識別碼（Commit SHA）。 |

---

## 📁 市集專案目錄架構

```text
antigravity-marketplace/
├── .gitmodules                     # Git 子模組設定檔（追蹤 8 個外掛儲存庫）
├── marketplace.json                # 官方市集相容清單（Marketplace Catalog Manifest）
├── plugins.json                    # Antigravity 宣告式外掛清單（支援 inherits 繼承）
├── package.json                    # 管理腳本與自動化指令設定
├── scripts/                        # 市集自動化工具鏈
│   ├── build-catalog.mjs           # 自動掃描外掛並產生 marketplace.json / plugins.json
│   ├── install-all.mjs             # 一鍵安裝或宣告式註冊腳本
│   ├── sync-submodules.mjs         # 子模組同步腳本
│   └── validate.mjs                # 原廠指令批次合規性驗證腳本
├── plugins/                        # 外掛集合（Git Submodules）
│   ├── antigravity-cli-statusline/
│   ├── antigravity-git-flow/
│   ├── antigravity-github-flow/
│   ├── antigravity-google-drive/
│   ├── antigravity-state/
│   ├── antigravity-chinese-copywriting/
│   ├── antigravity-help-agent/
│   └── antigravity-doc-template/
├── README.md                       # 英文說明文件
└── README.zh-TW.md                 # 繁體中文說明文件
```

---

## 🤝 貢獻與新增外掛

若要向本市集新增外掛：

1. 以 Git 子模組形式將外掛加入 `plugins/` 目錄：
   ```bash
   git submodule add <repository-url> plugins/<plugin-name>
   ```
2. 執行目錄重建腳本：
   ```bash
   npm run build
   ```
3. 執行合規性驗證：
   ```bash
   npm run validate
   ```
4. 提交並發起拉取請求（Pull Request）。

---

## 📄 授權條款（License）

本市集框架以 [MIT License](./LICENSE) 授權釋出。各外掛之授權條款請參閱其個別子目錄中的標註。
