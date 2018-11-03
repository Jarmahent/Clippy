import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import styles from './ImageGallery.css';
import routes from '../constants/routes.json';

class ImageGallery extends React.Component {
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

        <div className={styles.footer} />
      </div>
    );
  }
}

export default ImageGallery;
