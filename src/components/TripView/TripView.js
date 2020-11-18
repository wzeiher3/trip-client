import React from 'react';
import TripApiService from '../../services/trip-service';

export default class Trip extends React.Component {
  state = {
    stops: [],
  };

  //    getTripStops = () => {
  //        const { match } = this.props

  //        const trip_id = match.params.trips_id

  //        return trip_id

  //    }

  componentDidMount() {
    // get trip ID
    const { match } = this.props;

    const trip_id = match.params.trips_id;

    // send trips_id with request body

    TripApiService.getStops(trip_id).then((res) =>
      this.setState({ stops: [...res] })
    );
  }

  render() {
    console.log(this.state.stops);
    const stops = this.state.stops.map((stop, index) => {
      return (
        <div key={index}>
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
    return <div className="trip">{stops}</div>;
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
