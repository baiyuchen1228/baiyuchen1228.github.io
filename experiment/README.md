# Formatting Code Automatically
```
npm install --save husky lint-staged prettier
```

Now we can make sure every file is formatted correctly by adding a few lines to the package.json in the project root.
Add the following field to the package.json section:
```
Add the following field to the package.json section:
```

Next we add a 'lint-staged' field to the package.json, for example:
```
 "lint-staged": {
   "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}": [
     "prettier --write"
   ]
 }
```

./node_modules/.bin/prettier -c /
./node_modules/.bin/prettier -w /


ref: https://create-react-app.dev/docs/setting-up-your-editor/
