# Styled Components

Aqui podemos escrever o CSS exatamente da mesma forma do CSS original.

`yarn add styled-components`

> Snippet: `styled-rn` cria estrutura do arquivo tetificado.

## Diferenças entre React e RN

### 1. Não usa tags web, somente as tags nativas do RN

- ex: `styled.View` em vez de `styled.div`

### 2. Não declara CSS encadeado

Como seria encadeado (jeito q não funciona):

```
export const Container = styled.View`
  flex: 1;
  padding: 30px;
  background-color: #aaa;

  Text {
    foo: bar;
  }
`;
```

Como é o jeito correto:

```
export const Container = styled.View`
  flex: 1;
  padding: 30px;
  background-color: #aaa;
`;

export const Foobar = styled.Text`
  foo: bar;
`;
```

É pior. O bom seria se pudesse encadear... mas, foda-se.

### 3. Não dá pra declarar estilos globais

Estilos no body, ou algo q servisse para toda a aplicação não dá pra fazer. O
máximo q podemos fazer é criar components genéricos como, por exemplo,
containers, e sempre chamar estes mesmos components como se fosse algo global.

## src/pages/Main/index.js

```diff
import React from 'react';
import { Text } from 'react-native';

+ import { Container } from './styles';

export default function Main() {
  return (
-    <View>
+    <Container>
      <Text>Home Screen</Text>
-    </View>
+    </Container>
  );
}
```

## src/pages/Main/styles.js

```javascript
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
  background-color: #aaa;
`;
```
