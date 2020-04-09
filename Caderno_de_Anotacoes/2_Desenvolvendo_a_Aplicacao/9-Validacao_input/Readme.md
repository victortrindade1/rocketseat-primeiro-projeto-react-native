# Validação de campo

## src/pages/Main/index.js

```diff
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
+    error: null,
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
-    this.setState({ loading: true });
+    this.setState({ loading: true, error: false });

+    try {
+      // Validação: Campo vazio
+      if (newUser === '') {
+        throw new Error('Campo vazio');
+      }

+      // validação: usuário duplicado
+      const hasUser = users.find((user) => user.login === newUser);
+      if (hasUser) {
+        throw new Error('Usuário duplicado');
+      }

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
      });
+    } catch (error) {
      this.setState({
        error: true,
      });
+    } finally {
      this.setState({
        loading: false,
      });
      Keyboard.dismiss(); // Para o teclado sumir depois do submit
+    }
  };

  handleNavigate = (user) => {
    const { navigation } = this.props;

    navigation.navigate('User', { user });
  };

  render() {
-    const { users, newUser, loading } = this.state;
+    const { users, newUser, loading, error } = this.state;

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
+            error={error}
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

              <ProfileButton onPress={() => this.handleNavigate(item)}>
                <ProfileButtonText>Ver perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}

Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
```

## src/pages/Main/styles.js

```diff
export const Input = styled.TextInput.attrs({
  // A cor do placeholder eu preciso estilizar como atributo pois
  // placeholderTextColor é atributo de TextInput
  placeholderTextColor: '#999',
})`
  flex: 1;
  height: 40px;
  background: #eee;
  border-radius: 4px;
  padding: 0 15px;
-  border: 1px solid #eee;
+  border: ${(props) => (props.error ? `1px solid red;` : `1px solid #eee;`)};
`;
```
