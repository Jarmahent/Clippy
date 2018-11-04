import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { ipcRenderer } from 'electron';
import fs from 'fs';
import PropTypes from 'prop-types';
import styles from './ImageGallery.css';
import routes from '../constants/routes.json';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    const { userPath } = this.props;
    this.userPath = userPath();
  }

  state = {
    files: []
  };
  /* eslint-disable */

  componentDidMount() {
    const files = fs.readdirSync(`${this.userPath}/NativeImages/`);
    this.setState(() => ({
      files: files
    }));
  }
  /* eslint-disable */

  componentDidUpdate() {
    ipcRenderer.once('img-copy', () => {
      console.log('Updated!');
      const files = fs.readdirSync(`${this.userPath}/NativeImages/`);
      this.setState(() => ({
        files: files
      }));
    });
  }

  minimizeWindow = () => {
    console.log('Placeholder');
  };

  render() {
    /* eslint-disable */

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Link to={routes.CLIPPY} className={styles.TextLink}>
            Text
          </Link>
          <span className={styles.Image}>Images</span>
          <Link className={styles.settingsLink} to={routes.SETTINGS}>
            <FontAwesome name="cog" />
          </Link>
          <div className={styles.minimize} onClick={this.minmizeWindow}>
            <FontAwesome name="window-minimize" />
          </div>
        </div>
        <div className={styles.gridContainer}>
          {this.state.files.map((name, index) => (
            <div key={index} className={styles.imageContainer}>
              <img
                className={styles.copyPicture}
                src={`${this.userPath}/NativeImages/${name}`}
              />
            </div>
          ))}
        </div>
        <div className={styles.footer} />
      </div>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  userPath: PropTypes.func
};
