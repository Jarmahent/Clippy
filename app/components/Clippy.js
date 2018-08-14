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
      <img className={styles.clipboardImage}src={require('./img/clipboard.png')} />
        <h2 className={styles.h2}>Welcome To Clippy!</h2>
      </div>
    );
  }
}
