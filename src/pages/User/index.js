import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
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
    loading: false,
  };

  async componentDidMount() {
    const { route } = this.props;
    const { user } = route.params;

    this.setState({ loading: true });

    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({ stars: response.data });

    this.setState({ loading: false });
  }

  render() {
    const { stars, loading } = this.state;

    const { route } = this.props;
    const { user } = route.params;

    return (
      <Container loading={loading}>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <Loading>
            <ActivityIndicator color="#aaa" size="large" />
          </Loading>
        ) : (
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
