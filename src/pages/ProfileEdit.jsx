import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Carregando from '../Carregando';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  state = {
    isLoading: false,
    name: '',
    email: '',
    description: '',
    image: '',
    isButtonDisabled: true,
    redirect: false,
  };

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    const user = await getUser();
    const { name, email, image, description } = user;
    this.setState({
      name,
      email,
      image,
      description,
      isLoading: false,
    });
  }

  enabledButton = () => {
    const { name, email, image, description } = this.state;
    if (
      name.length > 0 && email.length > 0 && image.length > 0 && description.length > 0) {
      this.setState({
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  };

  validEmail = () => {
    const { email } = this.state;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const validacao = regex.test(email);
    if (validacao) {
      this.setState({
        isButtonDisabled: false,
      }, () => {
        this.enabledButton();
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      }, () => {
        this.enabledButton();
      });
    }
  };

  clickSave = async () => {
    this.setState({
      isLoading: true,
    });
    const { name, email, image, description } = this.state;
    await updateUser({
      name,
      email,
      image,
      description,
    });
    this.setState({
      redirect: true,
      isLoading: false,
    });
  };

  handlerChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    }, () => {
      this.enabledButton();
      this.validEmail();
    });
  };

  render() {
    const {
      isLoading,
      name, email, image, description, isButtonDisabled, redirect } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { isLoading ? <Carregando />
          : (
            <div>
              <input
                type="text"
                name="name"
                id="name"
                data-testid="edit-input-name"
                value={ name }
                onChange={ this.handlerChange }
              />
              <input
                type="text"
                name="email"
                id="email"
                data-testid="edit-input-email"
                value={ email }
                onChange={ this.handlerChange }
              />
              <input
                type="text"
                name="description"
                id="description"
                data-testid="edit-input-description"
                value={ description }
                onChange={ this.handlerChange }
              />
              <input
                type="text"
                name="image"
                id="image"
                value={ image }
                data-testid="edit-input-image"
                onChange={ this.handlerChange }
              />
              <button
                type="button"
                data-testid="edit-button-save"
                disabled={ isButtonDisabled }
                onClick={ this.clickSave }
              >
                Salvar
              </button>
              { redirect && <Redirect to="/profile" /> }
            </div>) }

      </div>
    );
  }
}
