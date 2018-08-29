// @flow
import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import styles from './Clippy.css';
import DbHandler from '../clipboarddb/Handler';

export default class Clippy extends Component {
  constructor() {
    super();
    this.dbHandler = new DbHandler();
  }

  state = {
    clipArray: []
  };

  componentDidMount() {
    const args = this.dbHandler.getAllData(25);
    const copyArray = [];

    args.map((name, index) => copyArray.push(args[index].data));
    this.setState(() => ({
      clipArray: copyArray
    }));
  }

  componentDidUpdate() {
    console.log('Updated!');
    ipcRenderer.once('db-ch', (event, args) => {
      const date = new Date();

      this.setState(prevState => ({
        clipArray: [args, ...prevState.clipArray]
      }));

      this.dbHandler.insertClipboardData(args, date.toString());
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
