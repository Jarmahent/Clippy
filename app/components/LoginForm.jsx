import React from 'react';
// import { Link } from 'react-router-dom';
import styles from './LoginForm.css';

class LoginForm extends React.Component {
  static Login(event) {
    event.preventDefault();
  }

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.Login = this.Login.bind(this);
  }

  state = {
    username: '',
    password: ''
  };

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
            <label>Username</label>
            <br />
            <input
              value={this.state.username}
              type="text"
              name="username"
              onChange={this.handleChange}
            />
            <br />
            <label>Password</label>
            <br />
            <input
              value={this.state.password}
              type="password"
              name="password"
              onChange={this.handleChange}
            />
            <br />
            <input
              type="submit"
              className={styles.submitButton}
              value="submit"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
