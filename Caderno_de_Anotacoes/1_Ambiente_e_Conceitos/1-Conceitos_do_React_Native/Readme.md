# React Native - Conceitos

- Vc declara functions e classes igual no React. Msm jeito de declarar
  components.
- Não existem as tags do HTML, como `<div>, <p>, <span>`... aqui vc vai usar tags
  próprias do RN.
- Os estilos são aplicados sem classes ou ids. Não chega a ser o Styled
  Component. É um jeito nativo de escrever CSS no JS, mas o Styled Components tb
  pode ser usado no RN.
- Todo texto é `<Text />`. Não existe estilização própria, como `<h1>`, etc.
- No RN, todos os elementos já possuem por padrão o CSS `display: flex`. Nós
  podemos usar direto o `justify-content`, `flex-direction`, `align-items`, etc.
- Todo elemento possui por padrão o `flexDirection: 'column'`. No React, por
  padrão é o `flexDirection: 'row'`.
- No `StyleSheet`, os textos de CSS como `center` e as cores vêm entre aspas
  simples:
  - No CSS:
    - `justify-content: center`
    - `color-background: #fff`
  - No StyleSheet:
    - `justifyContent: 'center'
    - `colorBackground: '#fff'`

## Sintaxe

```javascript
import {
  StyleSheet,
  View, // View é como se fosse a <div>
  Text,
  TouchableOpacity,
} from 'react-native';

function Button() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // Sem hífen e com lowerCamelCase
  },

  button: {
    backgroundColor: '#7159c1',
  },

  text: {
    fontWeight: 'bold',
  },
});
```
