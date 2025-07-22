# baiyuchen1228.github.io [Link](http://baiyuchen1228.github.io/ 'link')



## ⚙️ 前置需求

| 工具              | 版本建議     | 說明                                                                                                                                                                                             |
| --------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Node.js**     | ≥ 20 LTS | Stylelint 16 與 `stylelint-config-standard-scss@15` 要求                                                                                                                                          |
| **pnpm**        | ≥ 8      | 套件管理器；可改用 npm/yarn，但指令需自行替換                                                                                                                                                                    |

---

## 🛠️ 安裝步驟

```bash
# 1. 下載專案
git clone https://github.com/baiyuchen1228/baiyuchen1228.github.io.git
cd baiyuchen1228.github.io

# 2. 安裝相依套件
pnpm install
```

## 📑 專案內建指令

| 指令              | 功能        | 描述                                               |
| --------------- | --------- | ------------------------------------------------ |
| `pnpm lint`     | ESLint    | 檢查 `src/`、`.vue`、`.ts` 等所有檔案                     |
| `pnpm lint:fix` | ESLint    | 自動修復可修復項目                                        |
| `pnpm lint:css` | Stylelint | 針對 `*.css / *.scss / *.vue` `<style>` 區段做檢查並自動修復 |

---


2022.03.21 架設網站

2022.07.29 開始做物理實驗模擬網站
[物理實驗模擬網站](https://baiyuchen1228.github.io/experiment/index.html)

2023.02.15 啟用給全校理工學院大一使用 (一年使用量約為300+ 位學生)。

2023.06.30 第一年啟用成功，得到許多反饋並持續更新。

2024.04.18 新增 coding style 修正器，讓以後的程式統一並增加可讀性。

2024.04.19 美化 index.html

2025.02.02 新增 GitHub Actions, 上傳後自動檢測 coding style 並嘗試修正，修正後自動發 PR。
