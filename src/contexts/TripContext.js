import React from 'react';

const TripContext = React.createContext({
  trips: [],
  currTripId: null,
  setCurrTripId: () => {},
  setTrips: () => {},
  addTrip: () => {},
});

export default TripContext;

export class TripProvider extends React.Component {
  state={
      trips: [], 
      currTripId: null,
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

  render(){
    const value = {
      trips: this.state.trips,
      currTripId: this.state.currTripId,
      setTrips: this.setTrips,
      setCurrTripId: this.setCurrTripId,
      addTrip: this.handleAddTrip,
    };

    return (
        <TripContext.Provider value={value}>
            {this.props.children}
        </TripContext.Provider>
    )

  }

}
