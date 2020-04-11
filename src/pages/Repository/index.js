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
