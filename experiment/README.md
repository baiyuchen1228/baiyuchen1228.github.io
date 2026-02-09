# Formatting Code Automatically

```
pnpm install
```

Now, we can ensure every file is formatted correctly and added

check JavaScript:
```bash
pnpm lint
```

fix JavaScript:
```bash
pnpm lint:fix
```

check and fix CSS:
```bash
pnpm lint:css
```

ref: [stylelint](https://github.com/stylelint/stylelint) - A mighty, modern linter that helps you avoid errors and enforce conventions in your styles.

[eslint-config](https://github.com/antfu/eslint-config) - An ESLint configuration preset that helps you maintain consistent code quality.

# include library

jquery-ui [github](https://github.com/jquery/jquery-ui)

用於原本 html 的擴充，讓介面(button,menu)變得更好看，主要對寫程式會比較方便。

chart [github](https://github.com/chartjs/Chart.js)

用在繪製波形圖。

mathjs [unpkg](https://www.unpkg.com/browse/mathjs@13.2.1/)

內含各種數學函式用於計算波型。

# Project structure

每個實驗已整理為根目錄下的獨立資料夾：

```text
exp2/
exp3/
exp5/
exp6/
exp7/
exp10/
exp11/
```

每個 `expX/` 內包含該實驗的頁面與其 `css/js`。
共用第三方函式庫與圖片資源維持在根目錄：

- `module/`: 第三方函式庫
- `images/`: 圖片資源
