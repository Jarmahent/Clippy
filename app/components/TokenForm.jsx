import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import styles from './TokenForm.css';
import routes from '../constants/routes.json';
/* eslint-disable */

export default class TokenForm extends Component {
  constructor(props) {
    super(props);
    this.Login = this.Login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    token: '',
    token_saved: false
  };

  componentWillMount() {
    const { getToken } = this.props;
    const data = getToken();

    this.setState({
      token: data[0].token
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  Login(event) {
    event.preventDefault();
    const { insertToken, getToken } = this.props;
    insertToken(this.state.token);
  }

  render() {
    /* eslint-disable */
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
                value={this.state.token}
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
