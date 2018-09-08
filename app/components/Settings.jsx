// @flow
import React, { Component } from 'react';
// import { ipcRenderer} from 'electron';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Settings.css';

// const userPath = ipcRenderer.sendSync('get-userpath2', 'i');

export default class Settings extends Component<Props> {
  clearDB = () => {
    console.log('Clicked!');
  };

  render() {
    /* eslint-disable */

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
              <div className={styles.item} onClick={this.clearDB}>
                RESET TABLE
                <FontAwesome
                  className={styles.danger}
                  name="exclamation-triangle"
                />
              </div>
              <div className={styles.item}>PLACEHOLDER</div>
              <div className={styles.item}>PLACEHOLDER</div>
            </div>
          </div>
          <div className={styles.tableSettings}>
            <div className={styles.tableSettingsContent}>
              Style Settings
              <div className={styles.item} onClick={this.clearDB}>
                PLACEHOLDER
              </div>
              <div className={styles.item}>PLACEHOLDER</div>
              <div className={styles.item}>PLACEHOLDER</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
