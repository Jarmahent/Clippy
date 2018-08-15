// @flow
import React, { Component } from 'react';
import routes from '../constants/routes.json';
import styles from './Clippy.css';
import ExitBar from './ExitBar'

type Props = {};

export default class Clippy extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.container} data-tid="container">

      <div className={styles.imgContainer}><img className={styles.clipboardImage}src={require('./img/clipboard.png')} />
        <h1>CLIPPY</h1>
      </div>

      </div>
    );
  }
}
