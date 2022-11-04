import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state = {
    favoritas: [],
  };

  async componentDidMount() {
    const favoritas = await getFavoriteSongs();
    this.setState({
      favoritas,
    });
  }

  async componentDidUpdate() {
    const favoritasAtualizadas = await getFavoriteSongs();
    this.setState({
      favoritas: favoritasAtualizadas,
    });
  }

  render() {
    const { favoritas } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          favoritas.map((favorita) => (
            <MusicCard
              key={ favorita.trackId }
              trackName={ favorita.trackName }
              previewUrl={ favorita.previewUrl }
              trackId={ favorita.trackId }
              musica={ favorita }
              favorita
            />
          ))
        }
      </div>
    );
  }
}
