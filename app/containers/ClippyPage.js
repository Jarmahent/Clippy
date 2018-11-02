// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Clippy from '../components/Clippy';

export default class ClippyPage extends Component {
  render() {
    const { insertData, getAllData } = this.props;
    return <Clippy insertData={insertData} getAllData={getAllData} />;
  }
}

ClippyPage.propTypes = {
  insertData: PropTypes.func,
  getAllData: PropTypes.func
};

ClippyPage.defaultProps = {
  insertData: '[insertData] func is NULL',
  getAllData: '[getAllData] func is NULL'
};
