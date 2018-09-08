// @flow
import React, { Component } from 'react';
import Settings from '../components/Settings';

export default class SettingsPage extends Component{
  render() {
    /* eslint-disable */
    
    const { resetTable } = this.props;
    return <Settings
      resetTable={resetTable}
      />;
  }
}
