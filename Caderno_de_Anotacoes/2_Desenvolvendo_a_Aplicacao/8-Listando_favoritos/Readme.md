# Listando favoritos

## src/pages/User/index.js

```diff
import React, { Component } from 'react';
import PropTypes from 'prop-types';
- import { View } from 'react-native';
import api from '../../services/api';

- // import { Container } from './styles';
+ import {
+   Container,
+   Header,
+   Avatar,
+   Name,
+   Bio,
+   Stars,
+   Starred,
+   OwnerAvatar,
+   Info,
+   Title,
+   Author,
+ } from './styles';

export default class User extends Component {
  state = {
    stars: [],
  };

  async componentDidMount() {
-    console.tron.log(this.props);
    const { route } = this.props;
    const { user } = route.params;

    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({ stars: response.data });
  }

  render() {
    const { stars } = this.state;
-    return <View />;

+     const { route } = this.props;
+     const { user } = route.params;
+
+     return (
+       <Container>
+         <Header>
+           <Avatar source={{ uri: user.avatar }} />
+           <Name>{user.name}</Name>
+           <Bio>{user.bio}</Bio>
+         </Header>
+
+         <Stars
+           data={stars}
+           keyExtractor={(star) => String(star.id)}
+           renderItem={({ item }) => (
+             <Starred>
+               <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
+               <Info>
+                 <Title>{item.name}</Title>
+                 <Author>{item.owner.login}</Author>
+               </Info>
+             </Starred>
+           )}
+         />
+       </Container>
+     );
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

```javascript
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
  background-color: #fff;
`;

export const Header = styled.View`
  align-items: center;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #eee;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: #eee;
`;

export const Name = styled.Text`
  font-size: 20px;
  color: #333;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`;

export const Bio = styled.Text`
  font-size: 14px;
  line-height: 18px;
  color: #999;
  margin-top: 5px;
  text-align: center;
`;

export const Stars = styled.FlatList.attrs({
  // Tira a scrollbar vertical
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const Starred = styled.View`
  background: #f5f5f5;
  border-radius: 4px;
  padding: 10px 15px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
`;

export const OwnerAvatar = styled.Image`
  height: 42px;
  width: 42px;
  border-radius: 21px;
  background: #eee;
`;

export const Info = styled.View`
  margin-left: 10px;
  flex: 1;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 15px;
  font-weight: bold;
  color: #333;
`;

export const Author = styled.Text`
  font-size: 13px;
  color: #666;
  margin-top: 2px;
`;
```
