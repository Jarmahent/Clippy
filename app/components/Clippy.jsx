// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Clippy.css';

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
