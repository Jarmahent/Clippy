// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ipcRenderer, clipboard } from 'electron';
import styles from './Clippy.css';
import DbHandler from '../clipboarddb/Handler';
import MiscUtil from '../utils/Util';
import routes from '../constants/routes.json';

const userPath = ipcRenderer.sendSync('get-userpath', 'i');

export default class Clippy extends Component {
  constructor() {
    super();
    this.dbHandler = new DbHandler(userPath);
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

      const { clipArray } = this.state;

      if (!clipArray.includes(args.toString())) {
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

  componentWillUnmount() {
    this.dbHandler.closeConnection();
  }

  cutArray = e => {
    const content = e.target.textContent.toString();
    clipboard.writeText(content);
  };

  render() {
    /* eslint-disable */
    // Add a unique key creator for the key
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Link to={routes.SETTINGS}>Settings Link</Link>
        </div>
        <div className={styles.copyList}>
          <ul>
            {this.state.clipArray.map((name, index) => (
              <div className={styles.listItemContainer} key={index}>
                <li
                  className={styles.copies}
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
