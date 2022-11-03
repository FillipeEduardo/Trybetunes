import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../Carregando';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    isButtonDisabled: true,
    search: '',
    isLoading: false,
    artista: '',
    albuns: [],
  };

  handlerSearch = async () => {
    const { search } = this.state;
    const artist = search;
    this.setState({
      search: '',
      isLoading: true,
    }, async () => {
      const albuns = await searchAlbumsAPI(artist);
      this.setState({
        isLoading: false,
        artista: artist,
        isButtonDisabled: true,
        albuns,
      });
    });
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
    const { isButtonDisabled,
      search,
      isLoading, artista, albuns } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { isLoading ? <Carregando /> : (
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
              onClick={ this.handlerSearch }
            >
              Pesquisar
            </button>
          </form>
        ) }
        <span>{ `Resultado de álbuns de: ${artista}` }</span>

        { (albuns.length === 0) ? <span>Nenhum álbum foi encontrado</span> : (
          <ul>
            { albuns.map((album) => (
              <li
                key={ album.collectionId }
              >
                <img
                  src={ album.artworkUrl100 }
                  alt={ album.collectionId }
                />
                <br />
                <h6>{ album.collectionName }</h6>
                <br />
                <span>
                  { album.artistName }
                </span>
                <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  Abrir Album
                </Link>
              </li>
            )) }
          </ul>
        ) }

      </div>
    );
  }
}
