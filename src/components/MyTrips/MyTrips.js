import React, { Component } from 'react';
import TripContext from '../../contexts/TripContext';
import TripCards from '../TripCards/TripCards';
import TokenService from '../../services/token-service';
import './MyTrips.css';
import TripApiService from '../../services/trip-service';

export default class MyTrips extends Component {
  static contextType = TripContext;

  state = {
<<<<<<< HEAD
      userTrips: [],
  };

=======
    displayOptions: false,
    userTrips: [],
  };

  handleDeleteTrip = () => {};
>>>>>>> 33510e16c79bd40e1e0bf5b509c5367cc7c2bd7e

  render() {
    let jwt = TokenService.getAuthToken();
    const user = TokenService.parseJwt(jwt);

    const userTrips = this.context.trips.filter(
      (trip) => trip.user_id === user.user_id
    );

    const tripCards = userTrips.map((trip, index) => {
      return (
<<<<<<< HEAD
          <div className='my-trip-card-wrapper'>
           
        <TripCards
          key={index}
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
=======
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
>>>>>>> 33510e16c79bd40e1e0bf5b509c5367cc7c2bd7e
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
