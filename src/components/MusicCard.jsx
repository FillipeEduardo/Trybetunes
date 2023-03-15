import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/musicCard.css';

export default class MusicCard extends Component {
  isFavorite = () => {
    const { favorites, music: { trackId } } = this.props;
    return favorites.some((favorite) => favorite.trackId === trackId);
  };

  render() {
    const { music: { trackName, previewUrl, trackId }, click } = this.props;
    return (
      <div className="music-card">
        <span>{trackName}</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <input
          className="heart"
          onChange={ click }
          data-testid={ `checkbox-music-${trackId}` }
          type="checkbox"
          name="favorite"
          id="favorite"
          checked={ this.isFavorite() }
        />
      </div>
    );
  }
}

MusicCard.propTypes = {
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      trackId: PropTypes.number.isRequired,
    }),
  ).isRequired,
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  click: PropTypes.func.isRequired,
};
