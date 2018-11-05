import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import styles from './TokenForm.css';
import routes from '../constants/routes.json';

export default class TokenForm extends Component {
  constructor(props) {
    super(props);
    this.Login = this.Login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    token: ''
  };

  componentWillMount() {
    const { getToken } = this.props;
    const data = getToken();

    try {
      this.setState({
        token: data[0].token
      });
    } catch (err) {
      this.setState({
        token: 'Place Your Token Here!'
      });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  Login(event) {
    event.preventDefault();
    const { token } = this.state;
    const { insertToken } = this.props;
    insertToken(token);
  }

  render() {
    const { token } = this.state;

    return (
      <div>
        <Link to={routes.SETTINGS} className={styles.arrowContainer}>
          <FontAwesome className={styles.arrow} name="arrow-left" size="2x" />
        </Link>
        <div className={styles.subContainer}>
          <div className={styles.formdiv}>
            <form onSubmit={this.Login}>
              <label>Authentication Token</label>
              <input
                type="text"
                name="token"
                value={token}
                onChange={this.handleChange}
              />
              <br />
              <input
                type="submit"
                className={styles.submitButton}
                value="Save"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

TokenForm.propTypes = {
  getToken: PropTypes.func,
  insertToken: PropTypes.func
};

TokenForm.defaultProps = {
  getToken: '[getToken] func is NULL',
  insertToken: '[insertToken] func is NULL'
};
