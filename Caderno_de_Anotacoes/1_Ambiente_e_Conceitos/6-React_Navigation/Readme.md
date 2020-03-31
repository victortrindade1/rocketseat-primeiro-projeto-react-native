# React Navigation

`yarn add @react-navigation/native`

Se vc entrar na documentação, verá mais uma caralhada de lib q tem q instalar:
`yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view`

> OBS: a versão do professor é 4x. A minha é 5x, então vou seguir a documentação.

Existem alguns tipos de navigations:

- Stack Navigator
  - navega por página. Vc clica num botão, aparece outra página
- Drawer Navigator
  - Vc arrasta um menu lateral de navegação
- Tab Navigator
  - Navega por abas

Aqui faremos com o stack navigator. Cada um deles precisa instalar uma lib a
mais. Para stack:

`yarn add @react-navigation/stack`

## src/index.js

```diff
+ import 'react-native-gesture-handler';
import React from 'react';
import { View } from 'react-native';

import './config/ReactotronConfig';

export default function App() {
  return <View />;
}
```

> Tem q estar no topo!

## src/routes.js

## src/pages/Main/index.js

## src/pages/User/index.js
