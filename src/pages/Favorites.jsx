import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import '../css/favorites.css';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state = {
    favorites: [],
    isLoading: false,
  };

  componentDidMount() {
    this.setState({
      isLoading: true,
    }, async () => {
      const favorites = await getFavoriteSongs();
      this.setState({
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
    const { isLoading, favorites } = this.state;
    return (
      <div className="page-favorites" data-testid="page-favorites">
        <Header />
        <main className="main-favorite">
          <div className="container-azul-favorites">Músicas Favoritas</div>
          <div className="container-cinza-favorites">
            {
              isLoading ? <Loading /> : (
                <div className="list-favorites">
                  { favorites.map((favorite) => (
                    <MusicCard
                      key={ favorite.trackId }
                      music={ favorite }
                      favorites={ favorites }
                      click={ () => this.handlerClick(favorite) }
                    />)) }
                </div>
              )
            }
          </div>
        </main>
      </div>
    );
  }
}
