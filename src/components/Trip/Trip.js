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

    console.log(this.state.stops);
  }

  render() {
    return (
      <div className="trip">
        <div className="trip-header">content goes here</div>
        <span>more content goes here</span>
      </div>
    );
  }
}
