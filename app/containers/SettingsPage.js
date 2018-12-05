// @flow
import React, { Component } from 'react';
import Settings from '../components/Settings';

export default class SettingsPage extends Component {
  render() {
    /* eslint-disable */

    const {
      resetTable,
      clearImageDirectory,
      insertToken,
      getToken
    } = this.props;
    return (
      <Settings
        resetTable={resetTable}
        clearImageDirectory={clearImageDirectory}
        insertToken={insertToken}
        getToken={getToken}
      />
    );
  }
}
