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
  }

  componentDidUpdate() {
    sequence = 0;
  }

  shouldComponentUpdate() {
    sequence = 0;
    return false;
  }

  shortifyDestination = (dest) => {
    dest = dest.slice(0, 37) + '...';
    return dest;
  };

  render() {
    let color = this.sequenceColorOnCard();
    return (
      <div className="TripCard">
        <Link to={`/trips/${this.props.id}`}>
          <div>
            <div className="TripCard-topimage">
              <img src={images[this.props.image]} alt="city skyline"></img>
            </div>
            <div className="TripCard-middle-section">
              <div className="TripCard-title">
                {this.props.destination.length > 40 ? (
                  <h2>{this.shortifyDestination(this.props.destination)}</h2>
                ) : (
                  <h2>{this.props.destination}</h2>
                )}
              </div>

              <div className="Activities">
                <span>{this.props.short_description}</span>
                <br />
                <p>Activities: {this.props.activities}</p>
              </div>
            </div>
            <div className={`TripCard-bottom ${color}`}>
              <div className="TripCard-bottom-info">
                Days {this.props.days} {'     '}|<img className="card-heart" src={images.FilledHeart} alt='rating heart' />
                {this.props.rating ? (
                  <span>{this.props.rating}</span>
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
