import React from 'react';
import TripApiService from '../../services/trip-service';
import TripContext from '../../contexts/TripContext'
import './TripView.css'

export default class Trip extends React.Component {
  static contextType = TripContext

  state = {
    stops: [],
  };

  //    getTripStops = () => {
  //        const { match } = this.props

  //        const trip_id = match.params.trips_id

  //        return trip_id

  //    }

  getTripDescription() {
    const { match } = this.props
    // this.context.currTripId = match.params.trips_id
    let tripId = match.params.trips_id
    // it doesn't look like context.trips is being set with the trips?
    // I don't have time to look into it at the moment, but that seems to 
    // be the issue
    console.log(this.context.trips)
    let tripDescription = ''
    for (let i = 0; i < this.context.trips.length; i++) {
      if (tripId === this.context.trips[i].id) {
        console.log('found a match')
        tripDescription = this.context.trips[i].short_description
        return;
      }
    }
    console.log(tripDescription)
    return tripDescription
  }

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
    // testing the getTripDescription function
  //  this.getTripDescription()
    console.log(this.state.stops);
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
        <h2 className='trip-name'>Trip name here</h2>
        {stops}
      </div>
    )
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
