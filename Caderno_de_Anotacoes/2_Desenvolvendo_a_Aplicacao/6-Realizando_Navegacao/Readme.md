# Realizando navegação

Os Screen Components do react navigation possuem props nativas. Usaremos a prop
`navigation`. Um bom jeito de ver as props do screen component:

```javascript
...
export default class Main extends Component {
  ...
  async componentDidMount() {
    console.tron.log(this.props)
  }
}
```

## src/pages/Main/index.js

Sempre q vc passar parâmetros na definição de funções, o eslint vai reclamar de
não ter os parâmetros definidos no proptypes.

`yarn add prop-types`

```diff
import React, { Component } from 'react';
+ import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { Keyboard, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

export default class Main extends Component {
  state = {
    newUser: '',
    users: [],
    loading: false,
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');

    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { users } = this.state;

    if (prevState.users !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    const { users, newUser } = this.state;

    this.setState({ loading: true });

    const response = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    this.setState({
      users: [...users, data],
      newUser: '',
      loading: false,
    });

    Keyboard.dismiss(); // Para o teclado sumir depois do submit
  };

+  handleNavigate = (user) => {
+    const { navigation } = this.props;
+
+    navigation.navigate('User', { user });
+  };

  render() {
    const { users, newUser, loading } = this.state;

    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar usuário"
            value={newUser}
            onChangeText={(text) => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="add" size={20} color="#fff" />
            )}
          </SubmitButton>
        </Form>

        <List
          data={users}
          keyExtractor={(user) => user.login}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>

-              <ProfileButton onPress={() => {}}>
+              <ProfileButton onPress={() => this.handleNavigate(item)}>
                <ProfileButtonText>Ver perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}

+ Main.propTypes = {
+   navigation: PropTypes.shape({
+     navigate: PropTypes.func,
+   }).isRequired,
+ };
```

## src/pages/User/index.js (p/ testar)

```diff
import React from 'react';
import { View, Text } from 'react-native';

// import { Container } from './styles';

- export default function User() {
+ export default function User({ route }) {
+  console.tron.log(route.params.user);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Teta Screen</Text>
    </View>
  );
}
```
