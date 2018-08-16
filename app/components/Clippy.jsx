// @flow
import React, { Component } from 'react';
import styles from './Clippy.css';

const logoImg = require('./img/clipboard.png');

type Props = {};

export default class Clippy extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <div className={styles.imgContainer}>
          <img
            alt="imageHere"
            className={styles.clipboardImage}
            src={logoImg}
          />
          <h1>Clippy</h1>
        </div>
      </div>
    );
  }
}
