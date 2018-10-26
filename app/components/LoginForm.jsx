import React from 'react';
// import { Link } from 'react-router-dom';
import styles from './LoginForm.css';

/* eslint-disable */

class LoginForm extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.Login = this.Login.bind(this);
  }

  state = {
    username: '',
    password: ''
  };

  Login(event) {
    event.preventDefault();

    fetch('http://127.0.0.1:8000/copydata/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.username,
        password: this.password
      })
    })
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
      [event.target.name]: event.target.value
    });
  }

  render() {
    /* eslint-disable */
    return (
      <div className={styles.subContainer}>
        <div className={styles.formdiv}>
          <form onSubmit={this.Login}>
            <label>Authentication Token</label>
            <input type="text" name="token" />
            <br />
            <input type="submit" className={styles.submitButton} value="Save" />
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
