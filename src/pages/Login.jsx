import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import '../css/login.css';
import logo from '../imgs/logo.png';

const THREE_CHARACTER = 3;

export default class Login extends Component {
  state = {
    name: '',
    isLoading: false,
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = (e) => {
    e.preventDefault();
    const { name } = this.state;
    const { history } = this.props;
    this.setState({
      isLoading: true,
    }, async () => {
      await createUser({ name });
      history.push('/search');
    });
  };

  validation = () => {
    const { name } = this.state;
    if (name.length < THREE_CHARACTER) return true;
  };

  render() {
    const { name, isLoading } = this.state;
    return (
      <div className="container-login">
        <div className="div-branca-login" data-testid="page-login">
          {isLoading ? <Loading /> : (
            <>
              <img src={ logo } alt="logo" />
              <form onSubmit={ this.handleClick }>
                <label htmlFor="name">
                  <input
                    onChange={ this.handleChange }
                    value={ name }
                    type="text"
                    name="name"
                    data-testid="login-name-input"
                    id="name"
                    placeholder="Qual o seu nome?"
                  />
                </label>
                <button
                  disabled={ this.validation() }
                  data-testid="login-submit-button"
                  type="submit"
                  onClick={ this.handleClick }
                >
                  Entrar
                </button>
              </form>
            </>
          )}
        </div>
      </div>

    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
