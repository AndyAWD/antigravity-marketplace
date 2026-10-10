# antigravity-marketplace

[English](README.md) | 繁體中文

本儲存庫為 **Google Antigravity（AGY）** 專屬的自建外掛市集目錄註冊中心（Pure Catalog Registry Hub）。透過本市集，您可以一覽、檢索並直接安裝 AndyAWD 所開發的 8 款高品質 Antigravity 外掛程式（Plugins）。

本市集採用「**純目錄註冊表（Pure Catalog Registry）**」架構，與原廠官方市集機制一致，僅記錄外掛元資料（Metadata）與 GitHub 來源儲存庫位址，無須嵌入任何子模組或原始碼。外掛維護者於各自專案獨立發布版本，免除雙重維護負擔。

本市集收錄之所有外掛程式完整支援 Google Antigravity（AGY）三大核心平台：Antigravity 命令列介面（Command-Line Interface / CLI，`agy`）、Antigravity 整合開發環境（Integrated Development Environment / IDE）以及 Antigravity 2.0 桌面應用程式（Desktop Application）。

## 如何安裝

您可以透過 Antigravity 原廠命令列介面直接安裝本市集收錄的任一外掛程式：

```bash
agy plugin install https://github.com/AndyAWD/<plugin-name>
```

例如安裝命令列狀態列客製化外掛：

```bash
agy plugin install https://github.com/AndyAWD/antigravity-cli-statusline
```

若您需要一次性安裝本市集收錄的全數 8 款外掛程式，可在複製本儲存庫後執行：

```bash
npm run install:all
```

## 特色亮點

1. **跨三大平台無縫相容**：收錄之所有技能、規則與生命週期掛鉤（Lifecycle Hooks）全面相容於 CLI 終端機、IDE 側邊欄與 2.0 桌面版。
2. **純目錄零維護負擔**：採無實體原始碼之註冊表設計，外掛各自獨立開發與發布，徹底消除 Git 子模組雙重維護成本。
3. **收錄 8 款高生產力外掛**：涵蓋 CLI 狀態列客製化、雙套 Git 流程、Google 雲端硬碟整合、長程任務狀態追蹤、中文排版規範校驗、原廠知識庫助理與說明文件範本庫。
4. **100% 原廠規格合規檢驗**：全數外掛皆通過 `agy plugin validate` 官方驗證標準，確保穩定無衝突。
5. **原廠 CLI 隨插即用**：毋須額外設定套件管理器，直接透過原廠 `agy plugin install` 指令即可隨選即裝。

## 如何管理與切換外掛程式

• 列出已安裝外掛：

  ```bash
  agy plugin list
  ```

• 安裝外掛程式：

  ```bash
  agy plugin install <plugin-url>
  ```

• 啟用外掛程式：

  ```bash
  agy plugin enable <plugin-name>
  ```

• 停用外掛程式：

  ```bash
  agy plugin disable <plugin-name>
  ```

• 移除外掛程式：

  ```bash
  agy plugin uninstall <plugin-name>
  ```

## 專案資料夾目錄

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

## 指令功能說明

本市集收錄之 8 款外掛目錄總覽與核心斜線指令（Slash Commands）說明如下：

### 1. 市集收錄外掛目錄總覽

| 外掛名稱 | 最新版本 | 核心功能說明 | 原廠安裝指令 |
| :--- | :---: | :--- | :--- |
| **`antigravity-cli-statusline`** | `v1.8.0` | CLI 頁尾狀態列客製化，即時顯示配額、權杖、模型與 Git 分支。 | `agy plugin install https://github.com/AndyAWD/antigravity-cli-statusline` |
| **`antigravity-github-flow`** | `v0.1.0` | 輕量化 GitHub Flow，支援慣例式提交、PR 雙語說明與 Release 生成。 | `agy plugin install https://github.com/AndyAWD/antigravity-github-flow` |
| **`antigravity-git-flow`** | `v0.1.0` | 標準 Git Flow 分支策略自動化與慣例式提交。 | `agy plugin install https://github.com/AndyAWD/antigravity-git-flow` |
| **`antigravity-google-drive`** | `v0.1.0` | Google 雲端硬碟唯讀存取，支援檔案搜尋並自動匯出為 Markdown。 | `agy plugin install https://github.com/AndyAWD/antigravity-google-drive` |
| **`antigravity-state`** | `v0.1.0` | 長程任務狀態管理，透過 `STATE.md` 跨會話持續追蹤目標。 | `agy plugin install https://github.com/AndyAWD/antigravity-state` |
| **`antigravity-chinese-copywriting`** | `v1.0.0` | 中文文案排版規範校正（中英文與數字間空格、全形標點符號）。 | `agy plugin install https://github.com/AndyAWD/antigravity-chinese-copywriting` |
| **`antigravity-help-agent`** | `v1.1.0` | Google Antigravity 原廠知識庫與全生態系問答助理。 | `agy plugin install https://github.com/AndyAWD/antigravity-help-agent` |
| **`antigravity-doc-template`** | `v1.0.0` | 外掛標準說明文件範本庫與生成器（內建雙語 README/PR 範本）。 | `agy plugin install https://github.com/AndyAWD/antigravity-doc-template` |

### 2. 狀態列客製化

```text
/antigravity-cli-statusline:agy-cli-statusline
```

- **使用情境**：設定 Antigravity 命令列介面（CLI）頁尾狀態列顯示指標、順序與語系（繁中/簡中/英文/日文）。
- **運作流程**：
  1. 透過互動式表單選擇要顯示的指標（API 配額、權杖消耗、模型名稱、Git 分支、RAM 等）。
  2. 自動部署跨平台 Node.js 生命週期掛鉤（Hooks）並完成設定註冊。

### 3. 慣例式提交與 GitHub Flow

```text
/antigravity-github-flow:commit
```

- **使用情境**：整理目前工作區變更並自動生成符合慣例式提交規範（Conventional Commits）的 Commit。
- **運作流程**：
  1. 分析工作區暫存與未暫存變更。
  2. 自動推斷變更意圖與範圍（Scope），若有多個獨立任務自動拆分。
  3. 產生標準 Commit 訊息並附帶官方協作者簽章。

### 4. 拉取請求雙語說明生成

```text
/antigravity-github-flow:github-pr
```

- **使用情境**：為 GitHub 發起拉取請求（Pull Request）時自動撰寫結構化說明。
- **運作流程**：
  1. 詢問使用者偏好語言（繁體中文、英文或中英對照）。
  2. 比對分支與 main 的提交歷史與異動摘要。
  3. 自動套用標準 PR 範本產出標題與內文，並支援調用 GitHub CLI 直接建立。

### 5. 長程任務狀態管理

```text
/antigravity-state:agy-state
```

- **使用情境**：執行多步驟複雜任務、切換模型或跨對話重設前儲存當前工作進度。
- **運作流程**：
  1. 檢視專案目標、進行中子目標與已完成項目。
  2. 將里程碑狀態與下一步計畫寫入專案根目錄之 `STATE.md`。

### 6. Google 雲端硬碟唯讀檢索

```text
/antigravity-google-drive:agy-google-drive
```

- **使用情境**：需要安全讀取、檢索 Google 雲端硬碟共用資料夾內的檔案時。
- **運作流程**：
  1. 透過 Google Cloud 服務帳戶連線至指定共用雲端資料夾。
  2. 搜尋相關檔案並自動將 Google 文件或試算表轉換為 Markdown 檢視。

### 7. 中文文案排版規範校正

```text
/antigravity-chinese-copywriting:agy-chinese-copywriting
```

- **使用情境**：校對繁體中文文件（`.md`、`.txt`），確保排版嚴謹美觀。
- **運作流程**：
  1. 套用 sparanoid 排版準則，於中英文與數字之間補足半形空格。
  2. 修正半形中文標點符號為全形，並校正專有名詞大小寫。

### 8. Google Antigravity 原廠知識庫問答

```text
/antigravity-help:agy-help
```

- **使用情境**：查詢 Antigravity 全生態系規格、外掛體系、MCP 整合或故障排除。
- **運作流程**：
  1. 啟動官方知識庫審計助理。
  2. 基於正向實證三軌協議檢索本機手冊與官方規範提供精準解答。

---

### 🛠 維護者指南（Maintainer Guide）

本儲存庫維護者可使用以下工具自動維持市集目錄為最新狀態：

• 同步遠端 GitHub 最新版號與資訊清單：

  ```bash
  npm run sync
  ```

  腳本會自動並行向 8 款外掛之 GitHub 儲存庫抓取最新版號與描述，並重新產出 `marketplace.json`。

## 授權條款

本市集以 [MIT License](LICENSE) 授權釋出。各外掛程式之詳細授權條款請參閱其個別 GitHub 儲存庫中的標註。
