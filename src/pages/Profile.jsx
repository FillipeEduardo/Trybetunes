import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../Carregando';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    isLoading: false,
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

  render() {
    const { name, email, image, description, isLoading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { isLoading ? <Carregando /> : (
          <div>
            <span>{ name }</span>
            <span>{ email }</span>
            <span>{ description }</span>
            <img
              data-testid="profile-image"
              src={ image }
              alt={ name }
            />
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        ) }

      </div>
    );
  }
}
