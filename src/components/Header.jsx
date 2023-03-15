import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import logo from '../imgs/logo.png';
import '../css/header.css';
import iconePesquisa from '../imgs/pesquisa.png';
import iconeFavoritas from '../imgs/favoritas.png';
import iconePerfil from '../imgs/perfil.png';

export default class Header extends Component {
  state = {
    isLoading: true,
    name: '',
    image: '',
  };

  async componentDidMount() {
    const { name, image } = await getUser();
    this.setState({
      name,
      image,
      isLoading: false,
    });
  }

  render() {
    const { name, isLoading, image } = this.state;
    return (
      <header className="header-component" data-testid="header-component">
        {isLoading ? <Loading /> : (
          <div className="container-header">
            <img src={ logo } alt="logo" />
            <div className="links">
              <div className="link">
                <img src={ iconePesquisa } alt="pesquisa" />
                <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
              </div>
              <div className="link">
                <img src={ iconeFavoritas } alt="pesquisa" />
                <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
              </div>
              <div className="link">
                <img src={ iconePerfil } alt="pesquisa" />
                <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
              </div>
            </div>
            <div className="user">
              <img src={ image } alt="avatar" />
              <span data-testid="header-user-name">{ name }</span>
            </div>
          </div>
        )}
      </header>
    );
  }
}
