# Eslint, Prettier e Editor Config

## Editor Config

Como já possuo a extensão no vscode, simplesmente, num clique auxiliar no root,
clique em `Generate .editorconfig`.

### .editorconfig

```diff
root = true

[*]
indent_style = space
indent_size = 2
+ end_of_line = lf
charset = utf-8
- trim_trailing_whitespace = false
+ trim_trailing_whitespace = true
- insert_final_newline = false
+ insert_final_newline = true
```

## ESLint

Se vc possuir um arquivo `.eslintrc.js` criado por padrão, delete este arquivo.

`yarn add eslint -D`

Inicie o eslint
`yarn eslint --init`

Respostas:
1- To check syntax, find problems, and enforce code style
2- JavaScript modules (import/export)
3- React
4- Sem typescript
5- As opções são Browser e Node. Não serão nenhum dos dois. Aperte `<espaço>`
6- Use a popular style guide
7- Airbnb
8- JavaScript (ou JSON, tanto faz)
9- Yes

Como foi usado o npm e não o yarn, ele cria o arquivo `package-lock.json`.
Delete e dê um `yarn` para atualizar.

> Depois q instala o eslint, dá erro na tela. Após instalar todo mundo, vc vai
> precisar reiniciar o bundler limpando o cache:
> `react-native start --reset-cache`

### .eslintrc.js

```diff
module.exports = {
  env: {
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
+    'prettier',
+    'prettier/react'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
+  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
+    'prettier'
  ],
-  rules: {
-  },
+  rules: {
+    'prettier/prettier': 'error',
+    'react/jsx-filename-extension': [
+      'warn',
+      {
+        extensions: ['.jsx', '.js']
+      }
+    ],
+    'import/prefer-default-export': 'off'
+  },
};
```

## Prettier

Se tiver o arquivo .prettierrc.js, pode deletar, mas acho q não precisa.

`yarn add prettier eslint-config-prettier eslint-plugin-prettier babel-eslint -D`

### .prettierrc

```diff
module.exports = {
-  bracketSpacing: false,
-  jsxBracketSameLine: true,
  singleQuote: true,
-  trailingComma: 'all',
+  trailingComma: 'es5',
};
```

`react-native start --reset-cache`
