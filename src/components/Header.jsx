import React, { Component } from 'react';
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
      </header>
    );
  }
}
