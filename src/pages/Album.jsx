import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  // this.primeiraLinhas = {};

  state = {
    artistName: '',
    musicas: [],
    collectionName: '',
    favoritas: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const listaMusicas = await getMusics(id);
    const favoritas = await getFavoriteSongs();
    const [info, ...musicas] = listaMusicas;
    const { artistName, collectionName } = info;
    this.setState({
      artistName,
      musicas,
      collectionName,
      favoritas,
    }, console.log(favoritas));
  }

  render() {
    const { artistName, collectionName, musicas, favoritas } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h6
            data-testid="artist-name"
          >
            { artistName }
          </h6>
          <span data-testid="album-name">{ collectionName }</span>
        </div>
        { musicas.map((musica) => (
          <MusicCard
            key={ musica.trackId }
            trackName={ musica.trackName }
            previewUrl={ musica.previewUrl }
            trackId={ musica.trackId }
            musica={ musica }
            favorita={ favoritas.some((favorita) => musica.trackId === favorita.trackId) }
          />)) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
