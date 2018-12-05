// @flow
import React, { Component } from 'react';

// import { Link } from 'react-router-dom';
import { ipcRenderer } from 'electron';
// import routes from '../constants/routes.json';
import styles from './Settings.css';
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
            <span
              className={[
                photonStyles.icon,
                photonStyles['icon-back'],
                styles.backIcon
              ].join(' ')}
            />
            Settings
          </header>
          <div className={styles.mainContainer}>
            <button
              onClick={this.clearDB}
              type="button"
              className={[
                photonStyles.btn,
                photonStyles['btn-large'],
                photonStyles['btn-default']
              ].join(' ')}
            >
              Erase Clipboard History
            </button>
            <button
              onClick={this.openImageDirectory}
              type="button"
              className={[
                photonStyles.btn,
                photonStyles['btn-large'],
                photonStyles['btn-default']
              ].join(' ')}
            >
              Open Images Folder
            </button>
            <button
              type="button"
              className={[
                photonStyles.btn,
                photonStyles['btn-large'],
                photonStyles['btn-default']
              ].join(' ')}
            >
              Check Connection
            </button>
            <button
              onClick={this.clearImgDir}
              type="button"
              className={[
                photonStyles.btn,
                photonStyles['btn-large'],
                photonStyles['btn-default']
              ].join(' ')}
            >
              Erase Image History
            </button>
          </div>
          <div className={styles.seconContainer}>
            <div className={styles.tokenTitle}>Authentication Token</div>
            <div className={photonStyles['form-group']}>
              <input
                type="text"
                className={photonStyles['form-control']}
                placeholder="Token"
              />
            </div>
          </div>
          <footer
            className={[
              photonStyles.toolbar,
              photonStyles['toolbar-footer']
            ].join(' ')}
          >
            <div>Clippy v0.83.8</div>
          </footer>
        </div>
      </div>
    );
  }
}
