import React from 'react';
import TripApiService from '../../services/trip-service';
import TripContext from '../../contexts/TripContext';
import './TripView.css';

export default class Trip extends React.Component {
  static contextType = TripContext;

  state = {
    stops: [],
    currTripID: 0,
    trips: [],
    tripDescription: '',
  };

  getTripDescription() {
    this.setState({ trips: [...this.context.trips] });
    let tripID = this.state.currTripID;

    let tripDescription = this.state.trips[tripID].short_description;

    this.setState({ tripDescription: tripDescription });
    console.log('trip desc:', this.state.tripDescription);
    // return tripDescription
  }

  componentDidMount() {
    // get trip ID
    const { match } = this.props;

    const trip_id = match.params.trips_id;

    TripApiService.getStops(trip_id).then((res) =>
      this.setState({ stops: [...res] })
    );
    this.setState({ currTripID: trip_id });
    // this.getTripDescription()
  }

  render() {
    // console.log(this.state.currTripID)
    // testing the getTripDescription function
    console.log(this.context);
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
        <h2 className="trip-name">{this.state.tripDescription}</h2>
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
