// @flow
import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import styles from './Clippy.css';
import DbHandler from '../clipboarddb/Handler';

export default class Clippy extends Component {
  constructor() {
    super();
    this.dbHandler = new DbHandler();
    this.myRef = React.createRef();
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

  copyToClipboard = () => {
    console.log('Clicked Div!');
    console.log(this.ref);
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
                  onClick={this.copyToClipboard}
                  ref={ref => {
                    this.ref = ref;
                  }}
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
