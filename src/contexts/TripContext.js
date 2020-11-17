import React from 'react';

const tripContext = React.createContext({
    trips: [], 
    currTripId: null,
    setCurrTripId: () => {}, 
    setTrips: () => {},
    addTrip: () => {},
})

export default tripContext;