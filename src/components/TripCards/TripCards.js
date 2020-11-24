import React, { Component } from 'react';
import images from '../../assets/images/images';
import { Link } from 'react-router-dom';

import './TripCards.css';

let sequence = 0;

export default class TripCards extends Component {
  sequenceColorOnCard = () => {
    let colors = ['blue', 'pink', 'orange', 'violet', 'baby-blue'];
    if (sequence > colors.length - 1) {
      sequence = 0;
    }
    let number = sequence;
    sequence++;
    return colors[number];
  };

  componentWillUnmount() {
    sequence = 0;
    return false;
  }

  render() {
    let color = this.sequenceColorOnCard();
    return (
      <div className="TripCard">
        <Link to={`/trips/${this.props.id}`}>
          <div>
            <div className="TripCard-topimage">
              <img src={images[this.props.image]} alt="city skyline"></img>
            </div>
            <br />
            <div className="TripCard-middle-section">
              <div className="TripCard-title">
                <h2>{this.props.destination}</h2>
              </div>
              <div className="Activities">
                <span>{this.props.short_description}</span>
                <p>Activities: {this.props.activities}</p>
              </div>
            </div>
            <div className={`TripCard-bottom ${color}`}>
              <div className="TripCard-bottom-info">
                Days {this.props.days} |{' '}
                {this.props.rating ? (
                  <span>Rating {this.props.rating}</span>
                ) : (
                  <span className="rating-null">Unrated</span>
                )}
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
