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
    };

    return (
      <TripContext.Provider value={value}>
        {this.props.children}
      </TripContext.Provider>
    );
  }
}
