import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import TripApiService from '../../services/trip-service';
import TripContext from '../../contexts/TripContext';
import TripCards from '../TripCards/TripCards';

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
    // console.log(this.context);
    // const tripCards = this.context.trips.map((trip, index) => {
    //   return <TripCards />;
    // });
    return (
      <section className="Dashboard">
        <div className="upperSection">
          <div className="addTripButton"></div>
          <div className="titleDiv"></div>
          <div className="myTripButton"></div>
        </div>
        <div className="lowerSection">
          {' '}
          <TripCards />
        </div>
      </section>
    );
  }
}
