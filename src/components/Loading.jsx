import React, { Component } from 'react';
import '../css/loading.css';

export default class Loading extends Component {
  render() {
    return (
      <div className="box-loading">
        <div className="lds-roller">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
        <span>Carregando...</span>
      </div>
    );
  }
}
