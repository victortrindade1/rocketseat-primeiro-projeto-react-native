# WebView

Crie uma nova página na aplicação que vai ser acessada quando o usuário clicar em um repositório favoritado, essa página deve conter apenas o Header da aplicação. O conteúdo da página será uma WebView, ou seja, um browser integrado que exibe o atributo html_url presente no objeto do repositório que vem da API do Github.

Documentação de utilização da WebView.

Exemplo de código:

```javascript
<WebView source={{ uri: repository.html_url }} style={{ flex: 1 }} />
```

## Libs

`yarn add react-native-webview`

Existe um bug na versão atual da lib webview, e por isso, foi necessário
instalar:

`react-native-get-random-values`

### src/index.js

```diff
import 'react-native-gesture-handler';
+ import 'react-native-get-random-values';
import React from 'react';
import { StatusBar } from 'react-native';
```

## src/routes.js

```diff

import Main from './pages/Main';
import User from './pages/User';
+ import Repository from './pages/Repository';

...

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
        <Stack.Screen
          name="User"
          component={User}
          options={({ route }) => ({
            title: route.params.user.name,
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#7159c1' },
            headerTintColor: '#fff',
          })}
        />
+        <Stack.Screen
+          name="Repository"
+          component={Repository}
+          options={({ route }) => ({
+            title: route.params.repo.name,
+            headerTitleAlign: 'center',
+            headerStyle: { backgroundColor: '#7159c1' },
+            headerTintColor: '#fff',
+          })}
+        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

## src/pages/User/index.js

```diff
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Loading,
  Refresh,
} from './styles';

export default class User extends Component {
  state = {
    stars: [],
    loading: true,
    page: 1,
    refreshing: false,
  };

  async componentDidMount() {
    this.load();
  }

  load = async (page = 1) => {
    const { stars } = this.state;
    const { route } = this.props;
    const { user } = route.params;

    const response = await api.get(`/users/${user.login}/starred`, {
      params: { page },
    });

    this.setState({
      stars: page >= 2 ? [...stars, ...response.data] : response.data,
      page,
      loading: false,
      refreshing: false,
    });
  };

  loadMore = () => {
    const { page } = this.state;

    const nextPage = page + 1;

    this.load(nextPage);
  };

  refreshList = () => {
    this.setState({ refreshing: true, stars: [] }, this.load);
  };

+  handleNavigate = (repo) => {
+    const { navigation } = this.props;
+
+    navigation.navigate('Repository', { repo });
+  };

  render() {
    const { stars, loading, refreshing } = this.state;

    const { route } = this.props;
    const { user } = route.params;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <Loading />
        ) : (
          <Stars
            data={stars}
            refreshControl={
              <Refresh onRefresh={this.refreshList} refreshing={refreshing} />
            }
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            keyExtractor={(star) => String(star.id)}
            renderItem={({ item }) => (
-              <Starred>
+              <Starred onPress={() => this.handleNavigate(item)}>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}

/**
 * PropTypes.shape() é p/ obj onde precisa validar o q há dentro.
 * PropTypes.object é p/ validar o objeto apenas
 */
User.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      user: PropTypes.object,
    }),
  }).isRequired,
+  navigation: PropTypes.shape({
+    navigate: PropTypes.func,
+  }).isRequired,
};
```

## src/pages/User/styles.js

```diff
- export const Starred = styled.View`
+ export const Starred = styled(RectButton)`
  background: #f5f5f5;
  border-radius: 4px;
  padding: 10px 15px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
`;
```

## src/pages/Repository/index.js

```javascript
import React from 'react';
import PropTypes from 'prop-types';

import { Browser } from './styles';

export default function Repository({ route }) {
  const url = route.params.repo.html_url;

  return <Browser source={{ uri: url }} />;
}

Repository.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      repo: PropTypes.object,
    }),
  }).isRequired,
};
```

## src/pages/Repository/styles.js

```javascript
import styled from 'styled-components/native';

import { WebView } from 'react-native-webview';

export const Browser = styled(WebView)`
  flex: 1;
`;
```
