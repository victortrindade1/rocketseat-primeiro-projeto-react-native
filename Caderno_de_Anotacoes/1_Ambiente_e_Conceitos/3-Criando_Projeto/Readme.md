# Criando o Projeto

Instale a lib (se não tiver) `react-native` no terminal.

`yarn add global react-native-cli`

Crie um projeto com o comando:

`react-native init <NomeDoProjeto>`

> Para rodar o projeto, vc deve estar com o emulador aberto! Para abrir o
> emulador, Abra o Android Studio. Vá em `Configure > AVD Manager`, e dê play.
> Caso queira outro android para simular, baixe em `SDK Manager`.

Com o emulador aberto, rode o projeto:
`react-native start`  
`react-native run-android`

## App.js

```javascript
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome React!</Text>
      </View>
    );
  }
}

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
```
