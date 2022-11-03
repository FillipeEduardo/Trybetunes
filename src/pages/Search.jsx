import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    isButtonDisabled: true,
    search: '',
  };

  handlerChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    }, () => {
      if (value.length >= 2) {
        this.setState({
          isButtonDisabled: false,
        });
      } else {
        this.setState({
          isButtonDisabled: true,
        });
      }
    });
  };

  render() {
    const { isButtonDisabled, search } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name="search"
            id="search"
            data-testid="search-artist-input"
            value={ search }
            onChange={ this.handlerChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
