import React, { Component } from 'react';
import PropTypes from 'prop-types'
import routes from '../constants/routes.json';
import styles from './ExitBar.css'
const window = require('electron').remote.getCurrentWindow()

class ExitBar extends React.Component {

  closeWindow() {
    window.close();
  }
  maximizeWindow(){
    if(window.isMaximized()){
      window.unmaximize();
    }
    else{
      window.maximize();
    }

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
                <a  className={styles.Spacing} href="#" onClick={this.maximizeWindow}>⛶</a>
                <a className={styles.Spacing} href="#" onClick={this.closeWindow}>❌</a>
              </nav>
      </div>
      </div>

    );
  }
}

export default ExitBar;
