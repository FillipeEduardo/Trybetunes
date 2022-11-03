import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from '../Carregando';

export default class Header extends Component {
  state = {
    name: '',
    isLoading: false,
  };

  componentDidMount() {
    this.setState({
      isLoading: true,
    }, async () => {
      const nome = await this.pegarUsuario();
      this.setState({
        name: nome,
        isLoading: false,
      });
    });
  }

  pegarUsuario = async () => {
    const User = await getUser(localStorage.getItem('user'));
    return User.name;
  };

  render() {
    const { name, isLoading } = this.state;
    return (
      <header
        data-testid="header-component"
      >
        { isLoading ? <Carregando /> : (
          <span data-testid="header-user-name">{ name }</span>) }
        <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
        <Link data-testid="link-to-profile" to="/profile">Favoritas</Link>
      </header>
    );
  }
}
