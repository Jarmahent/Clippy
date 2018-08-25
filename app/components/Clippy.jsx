// @flow
import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import styles from './Clippy.css';

export default class Clippy extends Component {
  state = {
    clipArray: []
  };

  componentDidMount() {
    ipcRenderer.send('db-init', 1);
    ipcRenderer.on('db-init', (event, args) => {
      const copyArray = [];
      /* eslint-disable */
      args.map((name, index) => {
        copyArray.unshift(args[index].data);
      });
      /* eslint-disable */
      this.setState(prevState => ({
        clipArray: copyArray
      }));
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
          <ol>
            {this.state.clipArray.map((name, index) => (
              <li className={styles.copies} key={index}>
                {name}
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
