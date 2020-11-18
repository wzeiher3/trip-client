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
    console.log(this.context);
    const tripCards = this.context.trips.map((trip, index) => {
      return (
        <Link to={`/${trip.id}`}>
          <TripCards
            key={index}
            days={trip.days}
            rating={trip.rating}
            title={trip.trip_title}
            activities={trip.activities}
          />
        </Link>
      );
    });
    return (
      <section className="Dashboard">
        <div className="upperSection">
          <div className="addTripButton"></div>
          <div className="titleDiv"></div>
          <div className="myTripButton"></div>
        </div>
        <div className="lowerSection">{tripCards}</div>
      </section>
    );
  }
}
