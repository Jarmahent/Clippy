// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TokenForm from '../components/TokenForm';

export default class TokenPage extends Component {
  render() {
    const { insertToken } = this.props;
    return <TokenForm insertToken={insertToken} />;
  }
}

/* eslint-disable */

TokenPage.propTypes = {
  insertToken: PropTypes.func
};
