// @flow
import React, { Component } from 'react';
// import { ipcRenderer} from 'electron';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import routes from '../constants/routes.json';
import styles from './Settings.css';

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
      <div className={styles.container}>
        <div className={styles.title}>
          <Link to={routes.CLIPPY} className={styles.arrowContainer}>
            <FontAwesome className={styles.arrow} name="arrow-left" size="2x" />
          </Link>
          <h2>Settings</h2>
        </div>
        <div className={styles.settingsArea}>
          <div className={styles.tableSettings}>
            <div className={styles.tableSettingsContent}>
              Table Settings
              <button
                type="button"
                className={styles.item}
                onClick={this.clearDB}
              >
                ERASE HISTORY
                <FontAwesome
                  className={styles.danger}
                  name="exclamation-triangle"
                />
              </button>
              <button
                type="button"
                className={styles.item}
                onClick={this.openImageDirectory}
              >
                Open Images Folder
              </button>
              <div className={styles.item}>
                <button
                  type="button"
                  className={styles.item}
                  onClick={this.clearImgDir}
                >
                  ERASE IMAGE HISTORY
                  <FontAwesome
                    className={styles.danger}
                    name="exclamation-triangle"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className={styles.tableSettings}>
            <div className={styles.tableSettingsContent}>
              Network Settings
              <div>
                <Link className={styles.item} to={routes.TOKEN}>
                  Authentication
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
