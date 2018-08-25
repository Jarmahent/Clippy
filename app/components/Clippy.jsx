// @flow
import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import styles from './Clippy.css';

export default class Clippy extends Component {
  state = {
    clipArray: ['argument1', 'argument2']
  };

  componentDidMount() {
    ipcRenderer.send('db-init', 1);

    ipcRenderer.once('db-init', async (event, args) => {
      console.log(args); // Attatch these args to array
    });
  }

  componentDidUpdate() {
    console.log('Updated!');
  }

  render() {
    /* eslint-disable */
    ipcRenderer.once('db-ch', (event, args) => {
      this.setState(prevState => ({
        clipArray: [...prevState.clipArray, args]
      }));
    });

    return (
      <div className={styles.container} data-tid="container">
        <div className={styles.title}>Recent Copies</div>
        <div className={styles.copyList}>
          <ul>
            {this.state.clipArray.map((name, index) => (
              <li className={styles.copies} key={name}>
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
