# Acessando API do Github

## Axios

O axios muda nada de Web pra RN.

`yarn add axios`

### src/services/api.js

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
});

export default api;
```

## src/pages/Main/index.js

- No RN existe um submit diferente do web. Aqui, não fica no `<Form>`
  (até pq esta nem é a tag `<form>`). Fica no próprio botão (melhor, né...).

- `onPress` é o método padrão para dar o submit do form.

- `returnKeyType="send"` muda o "enter" do teclado para um botão "send".

```diff
- import React from 'react';
+ import React, { Component } from 'react';
+ import { Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
+ import api from '../../services/api';

import { Container, Form, Input, SubmitButton } from './styles';

- export default function Main() {
+ export default class Main extends Component {
+   state = {
+     newUser: '',
+     users: [],
+   };
+
+   handleAddUser = async () => {
+     const { users, newUser } = this.state;
+
+     const response = await api.get(`/users/${newUser}`);
+
+     const data = {
+       name: response.data.name,
+       login: response.data.login,
+       bio: response.data.bio,
+       avatar: response.data.avatar_url,
+     };
+
+     this.setState({
+       users: [...users, data],
+       newUser: '',
+     });
+
+     Keyboard.dismiss(); // Para o teclado sumir depois do submit
+   };
+
+  render() {
+    const { users, newUser } = this.state;

    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar usuário"
+            value={newUser}
+            onChangeText={(text) => this.setState({ newUser: text })}
+            returnKeyType="send"
+            onSubmitEditing={this.handleAddUser}
          />
-        <SubmitButton>
+        <SubmitButton onPress={this.handleAddUser}>
            <Icon name="add" size={20} color="#fff" />
          </SubmitButton>
        </Form>
      </Container>
    );
+  }
}
```

O Reactotron captura requests e mostra responses.
