import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styles from './ExitBar.css'

const window = require('electron').remote.getCurrentWindow()

class ExitBar extends React.Component {

  closeWindow() {
    window.close();
  }

  minimizeWindow(){
    window.minimize();
  }

  render () {
    return(
      <div>
      <div className={styles.DragBar}></div>
      <div className={styles.ExitBarLength}>
              <nav className={styles.ExitBar}>
                <a  className={styles.Spacing} href="#" onClick={this.minimizeWindow}>_</a>
                <a className={styles.Spacing} href="#" onClick={this.closeWindow}>❌</a>
              </nav>
      </div>
      </div>

    );
  }
}

export default ExitBar;
