import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import TripApiService from '../../services/trip-service';
import TripContext from '../../contexts/TripContext';
import TripCards from '../TripCards/TripCards';
import './Dashboard.css';

export default class Dashboard extends React.Component {
  state = {
    error: null,
  };

  static contextType = TripContext;

  componentDidMount() {
    TripApiService.getTrips()
      .then((res) => {
        this.context.setTrips(res);
      })
      .catch((error) => this.setState({ error: error }));
  }

  render() {
    const tripCards = this.context.trips.map((trip, index) => {
      return (
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
      );
    });
    return (
      <section className="Dashboard">
        <div className="upperSection">
          <div className="addTripButton">
            <Link to="/add-trip">
              <div className="myButton">Add a Trip!</div>
            </Link>
          </div>
          <div className="tripSearchBar">
            <label htmlFor="tripSearchBar">Search Bar</label>
            <input
              type="text"
              placeholder={'Search Trips'}
              name="tripSearchBar"
            ></input>
          </div>
          <div className="titleDiv"></div>
          <div className="myTripButton">
            <Link to="/my-trips">
              <div className="myButton">My Trips</div>
            </Link>
          </div>
        </div>
        <div className="lowerSection">{tripCards}</div>
      </section>
    );
  }
}
