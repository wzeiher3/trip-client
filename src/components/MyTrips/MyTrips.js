import React, { Component } from 'react';
import TripContext from '../../contexts/TripContext';
import TripCards from '../TripCards/TripCards';
import TokenService from '../../services/token-service';
import './MyTrips.css';
import TripApiService from '../../services/trip-service';

export default class MyTrips extends Component {
  static contextType = TripContext;

  state = {
    userTrips: [],
  };

  render() {
    let jwt = TokenService.getAuthToken();
    const user = TokenService.parseJwt(jwt);
    const userTrips = this.context.trips.filter(
      (trip) => trip.user_id === user.user_id
    );
    const tripCards = userTrips.map((trip, index) => {
      return (
        <div key={index} className="my-trip-card-wrapper">
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
        </div>
      );
    });
    return (
      <>
        <header>
          <div className="my-trips-header">
            <h1>My Trips</h1>
            <hr />
          </div>
        </header>
        <section className="my-trips">
          <div className="my-trip-cards">{tripCards}</div>
        </section>
      </>
    );
  }
}
