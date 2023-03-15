import PropTypes from 'prop-types';
import '../css/cardMusic.css';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CardMusic extends Component {
  render() {
    const {
      album: {
        collectionId, artworkUrl100, collectionName, artistName } } = this.props;
    return (
      <Link
        className="card-music"
        data-testid={ `link-to-album-${collectionId}` }
        to={ `/album/${collectionId}` }
      >
        <img src={ artworkUrl100 } alt="Album" />
        <h6>{collectionName}</h6>
        <span>{artistName}</span>
      </Link>
    );
  }
}

CardMusic.propTypes = {
  album: PropTypes.shape({
    collectionId: PropTypes.number.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
    artistName: PropTypes.string.isRequired,
  }).isRequired,
};
