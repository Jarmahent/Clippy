// @flow
import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import styles from './Clippy.css';

export default class Clippy extends Component {
  constructor() {
    super();
    ipcRenderer.send('db-init', 1);
    ipcRenderer.on('db-init', (event, args) => {
      const copyArray = [];

      args.map((name, index) => copyArray.push(args[index].data));

      this.setState(() => ({
        clipArray: copyArray
      }));
    });
  }

  state = {
    clipArray: []
  };

  componentDidUpdate() {
    console.log('Updated!');
    ipcRenderer.once('db-ch', (event, args) => {
      this.setState(prevState => ({
        clipArray: [args, ...prevState.clipArray]
      }));
    });
  }

  render() {
    /* eslint-disable */
    // Add a unique key creator for the key
    return (
      <div className={styles.container} data-tid="container">
        <div className={styles.title}>Recent Copies</div>
        <div className={styles.copyList}>
          <ul>
            {this.state.clipArray.map((name, index) => (
              <li className={styles.copies} key={index}>
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
