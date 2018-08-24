// @flow
import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import styles from './Clippy.css';

const logoImg = require('./img/clipboard.png');

type Props = {};

export default class Clippy extends Component<Props> {
  props: Props;

  render() {
    ipcRenderer.on('db-ch', (event, args) => {
      console.log(event);
      console.log(args);
      console.log('Received!');
    });

    return (
      <div className={styles.container} data-tid="container">
        <div className={styles.imgContainer}>
          <img
            alt="imageHere"
            className={styles.clipboardImage}
            src={logoImg}
          />
          <h1>CLIPPY</h1>
        </div>
      </div>
    );
  }
}
