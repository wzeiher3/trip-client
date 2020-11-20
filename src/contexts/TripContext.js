import React from 'react';

const TripContext = React.createContext({
  trips: [],
  stops: [],
  currTripId: null,
  setCurrTripId: () => {},
  setTrips: () => {},
  addTrip: () => {},
  addStop: () => {},
});

export default TripContext;

export class TripProvider extends React.Component {
  state={
      trips: [], 
      currTripId: null,
      stops: [], 
  }


  setTrips = (res) => {
    this.setState({
      trips: res,
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
      stops: [...this.state.stops, stop]
    });
  };

  render(){
    const value = {
      trips: this.state.trips,
      currTripId: this.state.currTripId,
      setTrips: this.setTrips,
      setCurrTripId: this.setCurrTripId,
      addTrip: this.handleAddTrip,
      addStop: this.addStop,
      stops: this.state.stops,
    };

    return (
        <TripContext.Provider value={value}>
            {this.props.children}
        </TripContext.Provider>
    )

  }

}
