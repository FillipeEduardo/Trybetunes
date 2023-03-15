import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import '../css/album.css';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  state = {
    infos: {},
    faixas: [],
    isLoading: false,
    favorites: [],
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({
      isLoading: true,
    }, async () => {
      const album = await getMusics(id);
      const [infos, ...faixas] = album;
      const favorites = await getFavoriteSongs();
      this.setState({
        infos,
        faixas,
        favorites,
        isLoading: false,
      });
    });
  }

  handlerClick = (song) => {
    const { favorites } = this.state;
    this.setState({
      isLoading: true,
    }, async () => {
      if (favorites.some((favorite) => favorite.trackId === song.trackId)) {
        await removeSong(song);
      } else await addSong(song);
      const favoritas = await getFavoriteSongs();
      this.setState({ isLoading: false, favorites: favoritas });
    });
  };

  render() {
    const { infos, faixas, isLoading, favorites } = this.state;
    return (
      <div className="page-album" data-testid="page-album">
        <Header />
        {isLoading ? <div className="box-cinza-album-loading"><Loading /></div> : (
          <main className="main-container-album">
            <div className="box-azul-album">
              <div className="infos-album">
                <img src={ infos.artworkUrl100 } alt="cover" />
                <div>
                  <h5 data-testid="album-name">{ infos.collectionName }</h5>
                  <span data-testid="artist-name">{ infos.artistName }</span>
                </div>
              </div>
            </div>
            <div className="box-cinza-album">
              { faixas.map((faixa) => (<MusicCard
                click={ () => this.handlerClick(faixa) }
                music={ faixa }
                key={ faixa.trackId }
                favorites={ favorites }
              />)) }
            </div>

          </main>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
