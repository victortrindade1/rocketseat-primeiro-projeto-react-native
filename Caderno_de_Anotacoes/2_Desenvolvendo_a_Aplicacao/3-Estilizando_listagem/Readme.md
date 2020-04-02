# Estilizando listagem

- As listas no RN diferem bem do web. Aqui não tem `.map`, `<ul>`, `<li>`, nada
  disso. É tudo `<Flatlist>` (lista simples) ou `<SectionList>` (lista com
  seleção).

- propriedades usadas da `<Flatlist>`:
  - data
  - keyExtractor
    - para o react organizar listas (tipo a key do web)
  - renderItem (onde vc coloca os components)

## src/pages/Main/index.js

```diff
import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

- import { Container, Form, Input, SubmitButton } from './styles';
+ import {
+   Container,
+   Form,
+   Input,
+   SubmitButton,
+   List,
+   User,
+   Avatar,
+   Name,
+   Bio,
+   ProfileButton,
+   ProfileButtonText,
+ } from './styles';

export default class Main extends Component {
  state = {
    newUser: '',
    users: [],
  };

  handleAddUser = async () => {
    const { users, newUser } = this.state;

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

    Keyboard.dismiss(); // Para o teclado sumir depois do submit
  };

  render() {
    const { users, newUser } = this.state;

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
          <SubmitButton onPress={this.handleAddUser}>
            <Icon name="add" size={20} color="#fff" />
          </SubmitButton>
        </Form>

+        <List
+          data={users}
+          keyExtractor={(user) => user.login}
+          renderItem={({ item }) => (
+            <User>
+              <Avatar source={{ uri: item.avatar }} />
+              <Name>{item.name}</Name>
+              <Bio>{item.bio}</Bio>
+
+              <ProfileButton onPress={() => {}}>
+                <ProfileButtonText>Ver perfil</ProfileButtonText>
+              </ProfileButton>
+            </User>
          )}
        />
      </Container>
    );
  }
}
```

## src/pages/Main/styles.js

```diff
import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
  background-color: #fff;
`;

export const Form = styled.View`
  flex-direction: row;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #eee;
`;

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
  border: 1px solid #eee;
`;

export const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #7159c1;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 12px;
`;

+ export const List = styled.FlatList.attrs({
+   // Tira a scrollbar vertical
+   showsVerticalScrollIndicator: false,
+ })`
+   margin-top: 20px;
+ `;
+
+ export const User = styled.View`
+   align-items: center;
+   margin: 0 20px 30px;
+ `;
+
+ export const Avatar = styled.Image`
+   width: 64px;
+   height: 64px;
+   border-radius: 32px;
+   background: #eee;
+ `;
+
+ export const Name = styled.Text`
+   font-size: 14px;
+   color: #333;
+   font-weight: bold;
+   margin-top: 4px;
+   text-align: center;
+ `;
+
+ export const Bio = styled.Text.attrs({
+   // Isso aqui é muito maneiro! Engole o texto pra qnt de + linhas q eu quero e bota ...
+   numberOfLines: 2,
+ })`
+   font-size: 13px;
+   line-height: 18px;
+   color: #999;
+   margin-top: 5px;
+   text-align: center;
+ `;
+
+ export const ProfileButton = styled(RectButton)`
+   margin-top: 10px;
+   align-self: stretch;
+   border-radius: 4px;
+   background: #7159c1;
+   justify-content: center;
+   align-items: center;
+   height: 36px;
+ `;
+ export const ProfileButtonText = styled.Text`
+   font-size: 14px;
+   font-weight: bold;
+   color: #fff;
+   text-transform: uppercase;
+ `;

```
