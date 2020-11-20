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
  loading: true,
});

export default TripContext;

export class TripProvider extends React.Component {
  state = {
    trips: [],
    currTripId: null,
    stops: [],
    loading: true,
  };

  static contextType = UserContext;

  setTrips = (res) => {
    this.setState({
      trips: res,
    });
  };

  setLoading = (statement) => {
    this.setState({
      loading: statement,
    });
  };

  setCurrTripId = (id) => {
    this.setState({
      currTripId: id,
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
      verifyAuth: this.verifyAuth,
      setLoading: this.setLoading,
      loading: true,
    };

    return (
      <TripContext.Provider value={value}>
        {this.props.children}
      </TripContext.Provider>
    );
  }
}
