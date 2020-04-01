# React Navigation

`yarn add @react-navigation/native`

Se vc entrar na documentação, verá mais uma caralhada de lib q tem q instalar:
`yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view`

> OBS: a versão do professor é 4x. A minha é 5x, então vou seguir a documentação.

> É fundamental ver a documentação!

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

+ import Routes from './routes';

export default function App() {
-  return <View />;
+  return <Routes />;
}
```

> react-native-gesture-handler tem q estar no topo! Independente do tipo de
> navigator

> react-native-gesture-handler, aproveitando q está instalada, possui umas
> funcionalidades legais q valem a pena ver na documentação. Essa lib tem por
> objetivo trazer comportamentos nativos do aparelho aos componentes do App. Por
> exemplo, botões de Android possuem nativo uma animação ao clicar. Qnd vc faz
> um app, vc perde isso. Essa lib traz de volta essas animações nativas.

## src/routes.js

```javascript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';

const Stack = createStackNavigator();

const routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            title: 'Usuários',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#7159c1' },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen name="User" component={User} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default routes;
```

## src/pages/Main/index.js

```javascript
import React from 'react';
import { View, Text } from 'react-native';

// import { Container } from './styles';

export default function Main() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}
```

## src/pages/User/index.js

```javascript
import React from 'react';
import { View, Text } from 'react-native';

// import { Container } from './styles';

export default function User() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Teta Screen</Text>
    </View>
  );
}
```
