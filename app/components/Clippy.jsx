// @flow
import React, { Component } from 'react';
import { ipcRenderer, clipboard } from 'electron';
import styles from './Clippy.css';
import DbHandler from '../clipboarddb/Handler';
import MiscUtil from '../utils/Util';

export default class Clippy extends Component {
  constructor() {
    super();
    this.dbHandler = new DbHandler(ipcRenderer.sendSync('get-userpath', 'i'));
    this.util = new MiscUtil();
  }

  state = {
    clipArray: []
  };

  componentDidMount() {
    // Initial data load from database this runs only once when the app starts
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

      /* eslint-disable */
      if (!this.state.clipArray.includes(args.toString())) {
        // Dont add the data to the db if its already there
        this.dbHandler.insertClipboardData(args, date.toString());
      }

      this.setState(prevState => {
        const removeDupes = this.util.removeDuplicates([
          args,
          ...prevState.clipArray
        ]);

        return { clipArray: removeDupes };
      });
    });
  }

  cutArray = e => {
    const content = e.target.textContent.toString();
    clipboard.writeText(content); // When a clipboard event happens it gets appended twice.
  };

  render() {
    /* eslint-disable */
    // Add a unique key creator for the key
    return (
      <div className={styles.container} data-tid="container">
        <div className={styles.header}>Recent Copies</div>
        <div className={styles.copyList}>
          <ul>
            {this.state.clipArray.map((name, index) => (
              <div className={styles.listItemContainer} key={index}>
                <li
                  className={styles.copies}
                  key={index}
                  onClick={this.cutArray}
                  arrayindex={index}
                >
                  {name}
                </li>
              </div>
            ))}
          </ul>
        </div>

        <div className={styles.footer}>FooterHere</div>
      </div>
    );
  }
}
