import React, { Component } from 'react';
import TripContext from '../../contexts/TripContext';
import TripCards from '../TripCards/TripCards';
import TokenService from '../../services/token-service';
import { Link } from 'react-router-dom';
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
    let count = 0;
    const tripCards = userTrips.map((trip, index) => {
      count++;
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
        <section>
          <div className="my-trips-header">
            <h2>My Trips</h2>
          </div>
        </section>
        <section className="my-trip-info-group">
          <div className="my-trip-dropdown">
            <button className="my-trip-info">Trips Stats</button>
              <div className="dropdown">
                <ul>States visited
                  <li>lat and log to map each</li>
                </ul>
                <ul>Total trips
                  <li> {count}</li>
                </ul>
              </div> 
          </div>
          <div className="addTripButton">
            <Link to="/add-trip">
              <div className="myButton">Add a Trip!</div>
            </Link>
          </div>
          {/* <div className="my-trip-dropdown">
            <button className="my-trip-info">Total trips</button>
            <p className="dropdown"> {count}</p>
          </div> */}
        </section>
        <section className="my-trips">
          <div className="my-trip-cards">{tripCards}</div>
        </section>
      </>
    );
  }
}
