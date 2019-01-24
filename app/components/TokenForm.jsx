import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import FontAwesome from 'react-fontawesome';
import styles from './TokenForm.css';
// import routes from '../constants/routes.json';
import photonStyles from './Photon/css/photon.css';

export default class TokenForm extends Component {
  constructor(props) {
    super(props);
    this.Login = this.Login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    token: ''
  };

  componentDidMount() {
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
        <div className={styles.secondContainer}>
          <div className={styles.tokenTitle}>Authentication Token</div>
          <form onSubmit={this.Login}>
            <div className={photonStyles['form-group']}>
              <input
                type="text"
                name="token"
                className={photonStyles['form-control']}
                placeholder={token}
                onChange={this.handleChange}
              />
              <div className={styles.saveBtn}>
                <button
                  type="submit"
                  className={[
                    photonStyles.btn,
                    photonStyles['btn-primary']
                  ].join(' ')}
                >
                  Save Token
                </button>
              </div>
            </div>
          </form>
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
