import React, { Component } from 'react';
import CardMusic from '../components/CardMusic';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../css/search.css';

const TWO_CHARACTER = 2;

export default class Search extends Component {
  state = {
    searchInput: '',
    albums: [],
    artist: '',
    frase: 'Pesquise algum Artista',
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handlerClick = async (e) => {
    e.preventDefault();
    const { searchInput } = this.state;
    const albums = await searchAlbumsAPI(searchInput);
    let frase = '';
    if (albums.length === 0) frase = 'Nenhum álbum foi encontrado';
    this.setState({
      artist: searchInput,
      searchInput: '',
      albums,
      frase,
    });
  };

  validation = () => {
    const { searchInput } = this.state;
    if (searchInput.length < TWO_CHARACTER) return true;
  };

  render() {
    const { searchInput, albums, artist, frase } = this.state;
    return (
      <div className="container-search" data-testid="page-search">
        <Header />
        <main className="main-search">
          <form onSubmit={ this.handlerClick }>
            <input
              onChange={ this.handleChange }
              value={ searchInput }
              placeholder="Nome do Artista"
              type="text"
              name="searchInput"
              id="searchInput"
              data-testid="search-artist-input"
            />
            <button
              disabled={ this.validation() }
              type="submit"
              data-testid="search-artist-button"
              onClick={ this.handlerClick }
            >
              Pesquisar
            </button>
          </form>
          <div className="list-albuns">
            { albums.length === 0 ? (
              <span className="nenhum">{ frase }</span>)
              : (
                <div className="box-cinza-pesquisa">
                  <span className="resultado-span">
                    Resultado de álbuns de
                    {' '}
                    { artist }
                  </span>
                  <div className="agora-sim-a-lista">
                    { albums.map(
                      (e) => (<CardMusic key={ e.collectionId } album={ e } />),
                    ) }
                  </div>
                </div>
              ) }
          </div>
        </main>
      </div>
    );
  }
}
