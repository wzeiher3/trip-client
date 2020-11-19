import React from 'react';

const TripContext = React.createContext({
  trips: [],
  currTripId: null,
  setCurrTripId: () => {},
  setTrips: () => {},
  addTrip: () => {},
  setStops: () => {},
  findTrip: () => {},
});

export default TripContext;
