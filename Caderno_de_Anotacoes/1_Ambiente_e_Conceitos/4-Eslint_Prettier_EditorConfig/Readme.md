# Eslint, Prettier, Editor Config, root import, Import Helper

Fontes:

- https://www.notion.so/Padr-es-de-projeto-com-ESLint-Prettier-e-EditorConfig-0b57b47a24724c859c0cf226aa0cc3a7
- https://dev.to/bybruno/configurando-caminhos-absolutos-no-react-native-pt-br-471o

## Editor Config

Como já possuo a extensão no vscode, simplesmente, num clique auxiliar no root,
clique em `Generate .editorconfig`.

### .editorconfig

```javascript
root = true

[*]
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
end_of_line = lf
```

## ESLint

Remova o eslint pré-configurado:
`yarn remove eslint @react-native-community/eslint-config`

Delete o arquivo `.eslintrc.js`.

Adicione o eslint: `yarn add eslint -D`

Inicie o eslint: `yarn eslint --init`

Respostas:
1- To check syntax, find problems, and enforce code style
2- JavaScript modules (import/export)
3- React
4- Sem typescript
5- As opções são Browser e Node. Não serão nenhum dos dois. Aperte `<espaço>`
6- Use a popular style guide
7- Airbnb
8- JavaScript (ou JSON, tanto faz)
9- No

Instale manualmente as libs pedidas na tela, menos `eslint@^5.16.0 || ^6.8.0 || ^7.2.0`
e `^3 || ^2.3.0 || ^1.7.0` do trecho `eslint-plugin-react-hooks@^4 || ^3 || ^2.3.0 || ^1.7.0`

Ficará algo parecido com isso:

`yarn add -D eslint-plugin-react@^7.21.5 eslint-config-airbnb@latest eslint-plugin-import@^2.22.1 eslint-plugin-jsx-a11y@^6.4.1 eslint-plugin-react-hooks@^4`

### .eslintignore

```javascript
**/*.js
node_modules
build
android
ios
```

### .eslintrc.js

```diff
module.exports = {
    "env": {
        "es2021": true
    },
+   "globals": {
+     "__DEV__": "readonly"
+   },
    "extends": [
        "plugin:react/recommended",
        "airbnb"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
+       "react-hooks"
    ],
    "rules": {
+     "react-hooks/rules-of-hooks": "error",
+     "react-hooks/exhaustive-deps": "warn",
+     "react/jsx-filename-extension": [
+       1,
+       {
+       "extensions": [
+         ".tsx"
+       ]
+       }
+     ],
+     "no-use-before-define": "off",
+     "react/react-in-jsx-scope": "off"
    }
};
```

## Prettier

Se tiver o arquivo .prettierrc.js, pode deletar, mas acho q não precisa.

`yarn add prettier eslint-config-prettier eslint-plugin-prettier -D`

### .eslintrc.js

```diff
"extends": [
        "plugin:react/recommended",
        "airbnb",
+       "plugin:prettier/recommended"
    ],
"plugins": [
        "react",
        "react-hooks",
+       "prettier"
    ],
"rules": {
+     "prettier/prettier": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
```

### .prettierrc

```javascript
module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'avoid',
};
```

### .eslintignore

```diff
**/*.js
+/*.js
node_modules
build
android
ios
```

> Se o prettier não estiver respondendo, vá em Settings -> Editor: Default Formatter -> esbenp.prettier-vscode

## Root Import

`yarn add babel-plugin-root-import -D`

### babel.config.js

```javascript
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        rootPathPrefix: '~',
        rootPathSuffix: 'src',
      },
    ],
  ],
  env: {
    production: {
      plugins: [
        'babel-plugin-root-import',
        {
          rootPathPrefix: '~',
          rootPathSuffix: 'src',
        },
      ],
    },
  },
};
```

### jsconfig.json

```javascript
{
  "compilerOptions": {
    "target": "es6",
    "baseUrl": ".",
    "paths": {
      "~/*": ["src/*"]
    }
  },
  "exclude": ["node_modules", "android", "ios"]
}
```

P/ o eslint não reclamar, adicione:

`yarn add eslint-import-resolver-babel-plugin-root-import -D`

### .eslintrc.js

```diff
"settings": {
      "import/resolver": {
        "babel-plugin-root-import": {
          "rootPathPrefix": "~",
          "rootPathSuffix": "src"
        }
      }
    }
```

## Import Helper

Ajuda a organizar os imports

`yarn add -D eslint-plugin-import-helpers`

### .eslintrc.js

```diff
plugins: [
    'react',
    'react-hooks',
    'prettier',
+   'eslint-plugin-import-helpers'
  ],
...
rules: {
  ...
+ 'import-helpers/order-imports': [
+     'warn',
+     {
+       // example configuration
+       newlinesBetween: 'always',
+       groups: ['/^react/', 'module', '/^~/', ['parent', 'sibling', 'index']],
+       alphabetize: { order: 'asc', ignoreCase: true },
+     },
+   ],
}
```

### Settings VSCode

Procure por Editor: Code Actions On Save

```diff
"editor.codeActionsOnSave": {
+   "source.organizeImports": true,
    "source.fixAll.eslint": true
  },
```
