# Formatting Code Automatically

```
pnpm install
```

Now, we can ensure every file is formatted correctly by adding a few lines to the package.json in the project root.
Add the following field to the package.json section:

```
Add the following field to the package.json section:
```

Next, we add a 'lint-staged' field to the package.json, for example:

```
 "lint-staged": {
   "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}": [
     "prettier --write"
   ]
 }
```

./node_modules/.bin/prettier -c /
./node_modules/.bin/prettier -w /

npx htmlhint "**/*.html"
npx stylelint '**/*.css' --fix

ref: https://create-react-app.dev/docs/setting-up-your-editor/

# include library

jquery-ui [github](https://github.com/jquery/jquery-ui)

用於原本 html 的擴充，讓介面(button,menu)變得更好看，主要對寫程式會比較方便。

chart [github](https://github.com/chartjs/Chart.js)

用在繪製波形圖。

mathjs [unpkg](https://www.unpkg.com/browse/mathjs@13.2.1/)

內含各種數學函式用於計算波型。
