import React, { Component } from 'react';
import TripContext from '../../contexts/TripContext';
import TripCards from '../TripCards/TripCards';
import TokenService from '../../services/token-service';
import './MyTrips.css';
import TripApiService from '../../services/trip-service';

export default class MyTrips extends Component {
  static contextType = TripContext;

  state = {
    displayOptions: false,
    userTrips: [],
  };

  handleDeleteTrip = () => {};

  render() {
    let jwt = TokenService.getAuthToken();
    const user = TokenService.parseJwt(jwt);
    const userTrips = this.context.trips.filter(
      (trip) => trip.user_id === user.user_id
    );
    const tripCards = userTrips.map((trip, index) => {
      return (
        <div
          key={index}
          className="my-trip-card-wrapper"
          onMouseEnter={() => this.setState({ displayOptions: true })}
          onMouseLeave={() => this.setState({ displayOptions: false })}
        >
          <TripCards
            id={trip.id}
            index={index}
            days={trip.days}
            rating={trip.rating}
            destination={trip.destination}
            activities={trip.activities}
            short_description={trip.short_description}
            image={trip.img}
          />
          {this.state.displayOptions ? (
            <div className="edit-delete-trip-buttons">
              <div className="button-wrapper">
                <div className="button-wrapper">
                  <button
                    className="myButton delete-btn"
                    type="click"
                    onClick={() => this.handleDeleteTrip}
                  >
                    Delete trip
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      );
    });
    return (
      <section className="my-trips">
        <div className="my-trips-header">
          <h2>My Trips</h2>
          <hr />
        </div>
        <div className="my-trip-cards">{tripCards}</div>
      </section>
    );
  }
}
