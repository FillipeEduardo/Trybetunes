import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
  };

  async componentDidMount() {
    const user = await getUser();
    const { name, email, image, description } = user;
    this.setState({
      name,
      email,
      image,
      description,
    });
  }

  render() {
    const { name, email, image, description } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
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
      </div>
    );
  }
}
