import React, { Component } from 'react';
import images from '../../assets/images/images';

import './TripCards.css';

export default class TripCards extends Component {
  render() {
    let rating = ['*', '**', '***', '****', '*****'];
    return (
      <>
        <div className="TripCard">
          <div className="TripCard-topimage">
            <img src={images.city} alt="city skyline"></img>
          </div>
          <br />
          <div className="TripCard-title">
            <h2>{this.props.title}</h2>
          </div>
          <div className="Categories">
            <p>Activities: {this.props.activities}</p>
          </div>
          <div className="TripCard-bottom">
            <div className="TripCard-bottom-info">
              Days {this.props.days} | Rating{' '}
              <span>{rating[this.props.rating - 1]}</span>
            </div>
          </div>
        </div>
      </>
    );
  }
}
