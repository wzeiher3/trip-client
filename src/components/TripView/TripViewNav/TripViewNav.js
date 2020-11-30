import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DirectionsLink from '../DirectionsLink/DirectionsLink';

import './TripViewNav.css';

class TripViewNav extends Component {
  render() {
    return (
      <section className="TripViewNav">
        <button
          className="myButton"
          onClick={() => this.props.handleEditTrip()}
        >
          Edit Trip
        </button>{' '}
        <button
          onClick={() => this.props.handleDeleteTrip()}
          className="myButton"
        >
          Delete Trip
        </button>{' '}
        <Link to="/my-trips">
          <div className="myButton">My Trips</div>
        </Link>{' '}
        <DirectionsLink stops={this.props.stops} />
      </section>
    );
  }
}

export default TripViewNav;
