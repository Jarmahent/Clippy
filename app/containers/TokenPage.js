// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TokenForm from '../components/TokenForm';

export default class TokenPage extends Component {
  render() {
    const { insertToken, getToken } = this.props;
    return <TokenForm insertToken={insertToken} getToken={getToken} />;
  }
}

/* eslint-disable */

TokenPage.propTypes = {
  insertToken: PropTypes.func,
  getToken: PropTypes.func
};
