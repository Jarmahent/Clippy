// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Settings.css';

type Props = {};

export default class Settings extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.container}>
        <h2>Settings</h2>
        <Link to={routes.CLIPPY}>Back to Clippy</Link>
      </div>
    );
  }
}
