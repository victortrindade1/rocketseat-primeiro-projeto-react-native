# Loading de repositórios

Adicione um indicator de loading utilizando `<ActivityIndicator />` antes de
carregar a lista de repositórios favoritados na tela de detalhes do Usuário.

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
+  Loading,
} from './styles';

export default class User extends Component {
  state = {
    stars: [],
+    loading: true,
  };

  async componentDidMount() {
    const { route } = this.props;
    const { user } = route.params;

    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({ stars: response.data });

+    this.setState({ loading: false });
  }

  render() {
-    const { stars } = this.state;
+    const { stars, loading } = this.state;

    const { route } = this.props;
    const { user } = route.params;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

+        {loading ? (
+          <Loading />
+        ) : (
          <Stars
            data={stars}
            keyExtractor={(star) => String(star.id)}
            renderItem={({ item }) => (
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
+        )}
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
};
```

## src/pages/User/styles.js

```diff
+ export const Loading = styled.ActivityIndicator.attrs({
+   color: '#7159c1',
+   size: 50,
+ })`
+   flex: 1;
+   align-items: center;
+   justify-content: center;
+   margin-top: 20px;
+ `;
```
