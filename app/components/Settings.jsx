// @flow
import React, { Component } from 'react';

// import { Link } from 'react-router-dom';
import { ipcRenderer } from 'electron';
// import routes from '../constants/routes.json';
// import styles from './Settings.css';
import photonStyles from './Photon/css/photon.css';

export default class Settings extends Component<Props> {
  componentWillUnmount() {
    ipcRenderer.removeAllListeners('open-dir', this.componentDidUpdate);
  }

  clearDB = () => {
    const { resetTable } = this.props;
    resetTable();
  };

  clearImgDir = () => {
    const { clearImageDirectory } = this.props;
    clearImageDirectory();
  };

  openImageDirectory = () => {
    ipcRenderer.send('open-dir', 'data');
  };

  render() {
    return (
      <div>
        <div className={photonStyles.window}>
          <header
            className={[
              photonStyles.toolbar,
              photonStyles['toolbar-header']
            ].join(' ')}
          >
            Settings
          </header>
          <footer
            className={[
              photonStyles.toolbar,
              photonStyles['toolbar-footer']
            ].join(' ')}
          />
        </div>
      </div>
    );
  }
}
