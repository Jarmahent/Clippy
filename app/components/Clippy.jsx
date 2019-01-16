// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ipcRenderer, clipboard } from 'electron';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import styles from './Clippy.css';
import MiscUtil from '../utils/Util';
import routes from '../constants/routes.json';
import NetController from '../NetworkController/NetController';

export default class Clippy extends Component {
  constructor(props) {
    super(props);
    this.util = new MiscUtil();
    this.NetworkController = new NetController();
  }

  state = {
    clipArray: [],
    authToken: 'No Token'
  };

  componentDidMount() {
    // Initial data load from database this runs only once when the app starts
    const { getAllData, getToken } = this.props;

    const gotToken = getToken();
    const token =
      (gotToken &&
        gotToken.token &&
        gotToken.token[0] &&
        gotToken.token[0].token) ||
      'No Token';

    const args = getAllData(25);
    const copyArray = [];

    args.map((name, index) => copyArray.push(args[index].data));
    console.log('componentDidMount ran!');
    this.setState(() => ({
      clipArray: copyArray,
      authToken: token
    }));
  }

  componentDidUpdate() {
    const { insertData } = this.props;
    const date = new Date();

    ipcRenderer.once('db-ch', (event, args) => {
      // const date = new Date();

      const { clipArray, authToken } = this.state;

      if (!clipArray.includes(args.toString())) {
        // Dont add the data to the db if its already there
        try {
          insertData(args, 'datehere');
          this.NetworkController.sendData(
            args.toString(),
            date.toString(),
            authToken
          );
        } catch (error) {
          console.log(`Error ${error}`);
        }
      }

      this.setState(prevState => {
        const removeDupes = this.util.removeDuplicates([
          args,
          ...prevState.clipArray
        ]);

        return { clipArray: removeDupes };
      });
    });
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners('db-ch', this.componentDidUpdate);
  }

  cutArray = e => {
    const content = e.target.textContent.toString();
    clipboard.writeText(content);
  };

  minmizeWindow = e => {
    ipcRenderer.sendSync('minimize', () => {});
    console.log(e);
  };

  render() {
    /* eslint-disable */
    // Add a unique key creator for the key
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.text}>Text</span>
          <Link to={routes.IMAGES} className={styles.ImageLink}>
            Images
          </Link>
          <Link className={styles.settingsLink} to={routes.SETTINGS}>
            <FontAwesome name="cog" />
          </Link>
          <div className={styles.minimize} onClick={this.minmizeWindow}>
            <FontAwesome name="window-minimize" />
          </div>
        </div>
        <div className={styles.copyList}>
          <ul>
            {this.state.clipArray.map((name, index) => (
              <div className={styles.listItemContainer} key={index}>
                <li
                  className={styles.copies}
                  onClick={this.cutArray}
                  arrayindex={index}
                >
                  {name}
                </li>
              </div>
            ))}
          </ul>
        </div>

        <div className={styles.footer} />
      </div>
    );
  }
}

Clippy.propTypes = {
  getAllData: PropTypes.func,
  insertData: PropTypes.func,
  getToken: PropTypes.func
};
