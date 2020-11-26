import React, { Component } from 'react';

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
        </button>
      </section>
    );
  }
}

export default TripViewNav;
