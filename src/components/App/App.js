import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute';
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute';
import LoginRoute from '../../routes/LoginRoute/LoginRoute';
import DashboardRoute from '../../routes/DashboardRoute/DashboardRoute';
import TripContext from '../../contexts/TripContext';
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute';
import './App.css';

export default class App extends Component {
  state = {
    hasError: false,
    trips: [],
    currTripId: null,
  };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
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

  render() {
    const { hasError } = this.state;

    const value = {
      trips: this.state.trips,
      currTripId: this.state.currTripId,
      setTrips: this.setTrips,
      setCurrTripId: this.setCurrTripId,
      addTrip: this.handleAddTrip,
    };
    return (
      <div className="App">
        <TripContext.Provider value={value}>
          <Header />
          <main>
            {hasError && <p>There was an error! Oh no!</p>}
            <Switch>
              <PrivateRoute exact path={'/'} component={DashboardRoute} />
              <PublicOnlyRoute
                path={'/register'}
                component={RegistrationRoute}
              />
              <PublicOnlyRoute path={'/login'} component={LoginRoute} />
              <Route component={NotFoundRoute} />
            </Switch>
          </main>
        </TripContext.Provider>
      </div>
    );
  }
}
