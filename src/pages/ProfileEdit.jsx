import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  state = {
    isLoading: false,
    name: '',
    email: '',
    description: '',
    image: '',
  };

  componentDidMount() {
    this.setState({
      isLoading: true,
    }, async () => {
      const { name, email, description, image } = await getUser();
      this.setState({
        isLoading: false,
        name,
        email,
        description,
        image,
      });
    });
  }

  handlerChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handlerClick = (e) => {
    e.preventDefault();
    const { name, email, description, image } = this.state;
    const { history } = this.props;
    this.setState({
      isLoading: true,
    }, async () => {
      await updateUser({ name, email, description, image });
      this.setState({ isLoading: false }, () => history.push('/profile'));
    });
  };

  validation = () => {
    const { name, email, description, image } = this.state;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const validName = name.length === 0;
    const validEmail = !regex.test(email);
    const validDescription = description.length === 0;
    const validImage = image.length === 0;
    return (validName || validEmail || validDescription || validImage);
  };

  render() {
    const { name, email, description, image, isLoading } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {isLoading ? <Loading /> : (
          <form onSubmit={ this.handlerClick }>
            <label htmlFor="name">
              Nome
              <input
                onChange={ this.handlerChange }
                value={ name }
                type="text"
                id="name"
                name="name"
                data-testid="edit-input-name"
              />
            </label>
            <label htmlFor="email">
              E-mail
              <input
                data-testid="edit-input-email"
                type="email"
                name="email"
                id="email"
                value={ email }
                onChange={ this.handlerChange }
              />
            </label>
            <label htmlFor="description">
              Descrição
              <textarea
                onChange={ this.handlerChange }
                value={ description }
                data-testid="edit-input-description"
                name="description"
                id="description"
                cols="30"
                rows="10"
              />
            </label>
            <label htmlFor="image">
              Imagem
              <input
                name="image"
                id="image"
                onChange={ this.handlerChange }
                value={ image }
                type="text"
                data-testid="edit-input-image"
              />
            </label>
            <button
              disabled={ this.validation() }
              onClick={ this.handlerClick }
              type="submit"
              data-testid="edit-button-save"
            >
              Salvar
            </button>
          </form>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
