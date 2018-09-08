// @flow
import React, { Component } from 'react';
import Clippy from '../components/Clippy';

export default class ClippyPage extends Component {
  render() {
    /* eslint-disable */
    
    const {insertData, getAllData } = this.props;
    return <Clippy
      insertData={insertData}
      getAllData={getAllData}/>;
  }
}
