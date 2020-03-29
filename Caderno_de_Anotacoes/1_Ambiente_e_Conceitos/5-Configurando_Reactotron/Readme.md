# Reactotron

O Reactotron é um programa de debug do React. Vc pode debugar pelo console do
browser, mas o Reactotron é muito mais teta.

Reactotron é bom pra RN e pra ReactJS com Redux. Sem Redux, não é bom pro
ReactJS.

Baixe o Reactotron para RN no pc:
`https://github.com/infinitered/reactotron/blob/master/docs/quick-start-react-native.md`

Coloque a lib no projeto:
`yarn add reactotron-react-native`

> Por mais q seja uma lib para desenvolvimento, o eslint recomenda colocar nas
> libs de produção. No código, existirá um condicional para inspecionar qnd for
> em desenvolvimento.

OBS: Na aula, o professor deleta o App.js, e cria um src/index.js. Não chega a
ser necessário. Eu vou fazê-lo só para acompanhar.

Copie o código de App.js e cole em src/index.js. Delete App.js

## src/index.js

```diff
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

+ import './config/ReactotronConfig';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome React!</Text>
    </View>
  );
}
```

## index.js

```diff
import { AppRegistry } from 'react-native';
- import App from './App';
+ import App from './src';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
```

## src/config/ReactotronConfig.js

```javascript
import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron..configure().useReactNative().connect();

  console.tron = tron;

  tron.clear(); // Opcional. Limpa a tela do Reactotron a cada refresh
}
```

OBS: Para Android, provavelmente vai precisar de acrescentar o ip local do pc
como argumento de `.configure()`. Meu ip é 192.168.1.5. Então fica assim:

```javascript
import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure({ host: '192.168.1.5' })
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear(); // Opcional. Limpa a tela do Reactotron a cada refresh
}
```

Existe uma treta de portas. Se vc ver q a coisa não ta legal:

`>>> ~/Android/Sdk/platform-tools/adb reverse tcp:9090 tcp:9090;`

> `__DEV__` é uma variável global do RN. O eslint vai reclamar. Configure o eslint

### .eslintrc.js

```diff
globals: {
  Atomics: 'readonly',
  SharedArrayBuffer: 'readonly',
+  __DEV__: 'readonly',
},
```

## console.log()

Agora o `console.log()` se tornou `console.tron.log()`. Assim, vc debuga pelo
Reactotron.
