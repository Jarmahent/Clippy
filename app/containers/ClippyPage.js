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
/* eslint-disable */

ClippyPage.propTypes = {
  insertData: PropTypes.func,
  getAllData: PropTypes.func
};
