import React from 'react';
import UserContext from './UserContext';

const TripContext = React.createContext({
  trips: [],
  stops: [],
  currTripId: null,
  setCurrTripId: () => {},
  setTrips: () => {},
  addTrip: () => {},
  addStop: () => {},
  verifyAuth: () => {},
  setLoading: () => {},
  returnUserID: () => {},
  setTripRating: () => {},
  loading: null,
});

export default TripContext;

export class TripProvider extends React.Component {
  state = {
    trips: [],
    currTripId: null,
    currPlace: {},
    stops: [],
    loading: false,
  };

  static contextType = UserContext;

  setTrips = (res) => {
    this.setState({
      trips: res,
    });
  };

  setTripRating = (trip_id) => {
    const index = this.state.trips.findIndex((trip) => {
      return trip.id === Number(trip_id);
    });
    let trips = [...this.state.trips];
    trips[index] = {
      ...trips[index],
      rating: Number(trips[index].rating) + 1,
    };
    this.setState({ trips });
  };

  setLoading = (boolean) => {
    this.setState({
      loading: boolean,
    });
  };

  setCurrTripId = (id) => {
    this.setState({
      currTripId: id,
    });
  };

  storeCurrPlace = (place) => {
    this.setState({
      currPlace: place,
    });
  };

  handleAddTrip = (trip) => {
    this.setState({
      trips: [...this.state.trips, trip],
    });
  };

  addStop = (stop) => {
    this.setState({
      stops: [...this.state.stops, stop],
    });
  };

  verifyAuth = (id) => {
    return id === this.context.user.id;
  };

  returnUserID = () => {
    return this.context.user.id;
  };

  render() {
    const value = {
      trips: this.state.trips,
      currTripId: this.state.currTripId,
      setTrips: this.setTrips,
      setCurrTripId: this.setCurrTripId,
      addTrip: this.handleAddTrip,
      addStop: this.addStop,
      stops: this.state.stops,
      storeCurrPlace: this.storeCurrPlace,
      verifyAuth: this.verifyAuth,
      loading: this.state.loading,
      setLoading: this.setLoading,
      returnUserID: this.returnUserID,
      setTripRating: this.setTripRating,
    };

    return (
      <TripContext.Provider value={value}>
        {this.props.children}
      </TripContext.Provider>
    );
  }
}
