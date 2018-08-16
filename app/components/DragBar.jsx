// @flow
import React, { Component } from 'react';
import styles from './DragBar.css';

type Props = {};

export default class DragBar extends Component<Props> {
  props: Props;

  render() {
    return <div className={styles.DragBar} />;
  }
}
