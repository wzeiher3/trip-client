import React, { Component } from 'react';
import images from '../../assets/images/images';

import './TripCards.css';

export default class TripCards extends Component {
  sequenceColorOnCard = (index) => {
    let colors = [
      'blue',
      'pink',
      'orange',
      'violet',
      'baby-blue',
      'blue',
      'pink',
      'orange',
      'violet',
      'blue',
      'baby-blue',
    ];
    let number = index;
    if (index > 10) {
      number = Math.floor(index / 10);
    }
    return colors[number];
  };

  render() {
    let rating = ['*', '**', '***', '****', '*****'];
    return (
      <div className="TripCard">
        <div className="TripCard-topimage">
          <img src={images.city} alt="city skyline"></img>
        </div>
        <br />
        <div className="TripCard-title">
          <h2>{this.props.destination}</h2>
        </div>
        <div className="Categories">
          <p>{this.props.short_description}</p>
          <p>Activities: {this.props.activities}</p>
        </div>
        <div
          className={`TripCard-bottom ${this.sequenceColorOnCard(
            this.props.index
          )}`}
        >
          <div className="TripCard-bottom-info">
            Days {this.props.days} | Rating{' '}
            <span>{rating[this.props.rating - 1]}</span>
          </div>
        </div>
      </div>
    );
  }
}
