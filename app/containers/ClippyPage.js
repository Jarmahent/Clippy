// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Clippy from '../components/Clippy';

export default class ClippyPage extends Component {
  render() {
    const { insertData, getAllData, getToken } = this.props;
    return (
      <Clippy
        insertData={insertData}
        getAllData={getAllData}
        getToken={getToken}
      />
    );
  }
}

ClippyPage.propTypes = {
  insertData: PropTypes.func,
  getAllData: PropTypes.func,
  getToken: PropTypes.func
};

ClippyPage.defaultProps = {
  insertData: '[insertData] func is NULL',
  getAllData: '[getAllData] func is NULL',
  getToken: '[getToken] func is NULL'
};
