// @flow
import React, { Component } from 'react';
// import { ipcRenderer} from 'electron';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Settings.css';

export default class Settings extends Component<Props> {
  clearDB = () => {
    const { resetTable } = this.props;
    resetTable();
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
                RESET TABLE
                <FontAwesome
                  className={styles.danger}
                  name="exclamation-triangle"
                />
              </button>
              <Link className={styles.item} to={routes.TOKEN}>
                Authentication
              </Link>
              <div className={styles.item}>PLACEHOLDER</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
