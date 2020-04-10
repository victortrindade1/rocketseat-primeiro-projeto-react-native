# Scroll infinito

Adicione uma funcionalidade de scroll infinito na lista de repositórios favoritados. Assim que o usuário chegar nos 20% do final de lista, busque pelos items na próxima página e adicione na lista. Seu código ficará da seguinte forma:

```javascript
<Stars
  onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
  onEndReached={this.loadMore} // Função que carrega mais itens
  // Restante das props
>
```

Para requisitar uma nova página no Github utilize um parâmetro page no fim da URL:

```
https://api.github.com/users/diego3g/starred?page=2
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
} from './styles';

export default class User extends Component {
  state = {
    stars: [],
    loading: true,
+   page: 1,
  };

-  async componentDidMount() {
-    const { route } = this.props;
-    const { user } = route.params;
-
-    const response = await api.get(`/users/${user.login}/starred`);
-
-    this.setState({ stars: response.data });
-
-    this.setState({ loading: false });
-  }

+  async componentDidMount() {
+    this.load();
+  }
+
+  load = async (page = 1) => {
+    const { stars } = this.state;
+    const { route } = this.props;
+    const { user } = route.params;
+
+    const response = await api.get(`/users/${user.login}/starred`, {
+      params: { page },
+    });
+
+    this.setState({
+      stars: page >= 2 ? [...stars, ...response.data] : response.data,
+      page,
+      loading: false,
+    });
+  };
+
+  loadMore = () => {
+    const { page } = this.state;
+
+    const nextPage = page + 1;
+
+    this.load(nextPage);
+  };

  render() {
    const { stars, loading } = this.state;

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
+            onEndReachedThreshold={0.2}
+            onEndReached={this.loadMore}
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
};
```
