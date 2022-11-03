import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Carregando from '../Carregando';

export default class Login extends Component {
  render() {
    const {
      nome,
      isButtonDisabled,
      handlerChange,
      login,
      isLoading,
      redirecionar } = this.props;

    return (
      <div data-testid="page-login">
        { isLoading ? <Carregando /> : (
          <form>
            <input
              type="text"
              name="nome"
              id="nome"
              data-testid="login-name-input"
              value={ nome }
              onChange={ handlerChange }
            />
            <button
              disabled={ isButtonDisabled }
              data-testid="login-submit-button"
              type="button"
              onClick={ login }
            >
              Entrar
            </button>
          </form>) }

        { redirecionar && <Redirect to="/search" /> }
      </div>
    );
  }
}

Login.propTypes = {
  nome: PropTypes.string.isRequired,
  isButtonDisabled: PropTypes.bool.isRequired,
  handlerChange: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  redirecionar: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
