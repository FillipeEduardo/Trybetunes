import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from '../Carregando';

export default class MusicCard extends Component {
  state = {
    favorita: false,
    isLoading: false,
  };

  componentDidMount() {
    const { favorita } = this.props;
    this.setState({
      favorita,
    });
  }

  handlerChecked = () => {
    const { musica } = this.props;
    this.setState(
      (prevState) => ({
        favorita: !prevState.favorita,
        isLoading: true,
      }),
      async () => {
        await addSong(musica);
        this.setState({
          isLoading: false,
        });
      },
    );
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { favorita, isLoading } = this.state;
    return (
      <div>
        { isLoading ? <Carregando /> : (
          <div>
            <span>{ trackName }</span>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              { ' ' }
              { ' ' }
              <code>audio</code>
              .
            </audio>
            <label htmlFor="favorita">
              Favorita
              <input
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                name="favorita"
                id="favorita"
                onChange={ this.handlerChecked }
                checked={ favorita }
              />
            </label>
          </div>
        ) }

      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  favorita: PropTypes.bool,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  musica: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};
