import React from 'react';
import TripApiService from '../../services/trip-service';
import TripContext from '../../contexts/TripContext';
import { Link } from 'react-router-dom';
import './TripView.css';

export default class Trip extends React.Component {
  static contextType = TripContext;

  state = {
    stops: [],
    currTripID: 0,
    trip: [],
    tripDescription: '',
    formExpanded: false,
  };

  componentDidUpdate() {
    if (this.state.trip.length === 0 && this.context.trips.length !== 0) {
      this.setState({ trip: this.context.trips[this.state.currTripID - 1] });
    }
  }

  componentDidMount() {
    // get trip ID
    const { match } = this.props;
    // set trip_id variable
    const trip_id = match.params.trips_id;

    // get stops for the current trip
    TripApiService.getStops(trip_id).then((res) =>
      // set the state with stops, currTripID
      this.setState({ stops: [...res], currTripID: trip_id })
    );
  }

  render() {
    // console.log(this.state.currTripID)
    // testing the getTripDescription function
    // this.getTripDescription()
    const stops = this.state.stops.map((stop, index) => {
      return (
        <div className="trip-stop" key={index}>
          <div className="trip-header">
            <h2>{stop.stop_name}</h2>
            <span>
              {stop.city}, {stop.state}
            </span>
          </div>
          <p>{stop.description}</p>
        </div>
      );
    });
    return (
      <div className="trip">
        <div className="addStopButton">
          <div
            className="myButton"
            onClick={() => this.setState({ formExpanded: true })}
          >
            Add a Stop!
          </div>
        </div>
        <h2 className="trip-name">{this.state.trip.short_description}</h2>
        {stops}
      </div>
    );
  }
}

// category: "tourist_attraction"
// city: "Orlando"
// description: "The Walt Disney World Resort, also called Walt Disney World and Disney World, is an entertainment complex in Bay Lake and Lake Buena Vista, Florida, in the United States, near the cities of Orlando and Kissimmee."
// id: 7
// latitude: "28.3852"
// longitude: "-81.5639"
// state: "FL"
// stop_name: "Disneyworld"
// trip_id: 1
