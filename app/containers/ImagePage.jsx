// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGallery from '../components/ImageGallery';

export default class ImagePage extends Component {
  render() {
    const { userPath } = this.props;

    return <ImageGallery userPath={userPath} />;
  }
}

ImagePage.propTypes = {
  userPath: PropTypes.func
};

ImagePage.defaultProps = {
  userPath: '[userPath] func = NULL'
};
