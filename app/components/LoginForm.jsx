import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './LoginForm.css';

class LoginForm extends React.Component {
  render () {
    return(
      <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <div className={styles.formdiv}>
          <form>
            <label>Username</label>
            <br/>
            <input type="text" name="name"></input>
            <br/>
            <label>Password</label>
            <br/>
            <input type="text"name="name"></input>
             <br/>
            <input type="submit" value="submit"></input>
          </form>
        </div>
    </div>
    </div>
    );
  }
}

export default LoginForm;
