# Buscando dados da API

Vai buscar na api do github todos os stars dado pelo usuário.

## src/routes.js

Colocar dinamicamente o nome do usuário como título de sua própria página de
perfil.

```diff
<Stack.Screen
  name="User"
  component={User}
+  options={({ route }) => ({ title: route.params.user.name })}
/>
```

## src/pages/User/index.js

```javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import api from '../../services/api';

// import { Container } from './styles';

export default class User extends Component {
  state = {
    stars: [],
  };

  async componentDidMount() {
    console.tron.log(this.props);
    const { route } = this.props;
    const { user } = route.params;

    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({ stars: response.data });
  }

  render() {
    const { stars } = this.state;
    return <View />;
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
