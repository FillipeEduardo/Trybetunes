import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import '../css/profile.css';

export default class Profile extends Component {
  state = {
    isLoading: false,
    user: {},
  };

  componentDidMount() {
    this.setState({
      isLoading: true,
    }, async () => {
      const user = await getUser();
      this.setState({
        user,
        isLoading: false,
      });
    });
  }

  clickEditProfile = () => {
    const { history } = this.props;
    history.push('/profile/edit');
  };

  render() {
    const { user: { name, email, description, image }, isLoading } = this.state;
    return (
      <div className="page-profile" data-testid="page-profile">
        <Header />
        <div className="container-cinza-profile">
          {isLoading ? <Loading /> : (
            <div>
              <img
                className="profile-image"
                data-testid="profile-image"
                src={ image }
                alt="user"
              />
              <div className="textos">
                <h3>Nome</h3>
                <span>{name}</span>
                <h3>E-mail</h3>
                <span>{email}</span>
                <h3>Descrição</h3>
                <span>{description}</span>
                <br />
                <button
                  onClick={ this.clickEditProfile }
                  type="button"
                >
                  Editar perfil
                </button>
              </div>
            </div>
          ) }
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
