import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  // this.primeiraLinhas = {};

  state = {
    artistName: '',
    musicas: [],
    collectionName: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const listaMusicas = await getMusics(id);
    const [info, ...musicas] = listaMusicas;
    const { artistName, collectionName } = info;
    this.setState({
      artistName,
      musicas,
      collectionName,
    }, console.log(musicas));
  }

  render() {
    const { artistName, collectionName, musicas } = this.state;
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
        { musicas.map(({ trackName, previewUrl, trackId }) => (
          <MusicCard
            key={ trackId }
            trackName={ trackName }
            previewUrl={ previewUrl }
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
