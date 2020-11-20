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
import AddTripForm from '../AddTripForm/AddTripForm';
import TripView from '../TripView/TripView';
import MyTrips from '../MyTrips/MyTrips';
import TripApiService from '../../services/trip-service';
import './App.css';

export default class App extends Component {
  state = {
    hasError: false
  };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  // setTrips = (res) => {
  //   this.setState({
  //     trips: res,
  //   });
  // };

  // setCurrTripId = (id) => {
  //   this.setState({
  //     currTripId: id,
  //   });
  // };

  // handleAddTrip = (trip) => {
  //   this.setState({
  //     trips: [...this.state.trips, trip],
  //   });
  // };

  componentDidMount = () => {
    TripApiService.getTrips()
      .then((res) => {
        this.setTrips(res);
      })
      .catch((error) => this.setState({ error: error }));
  };

  render() {
    const { hasError } = this.state;
    // const value = {
    //   trips: this.state.trips,
    //   currTripId: this.state.currTripId,
    //   setTrips: this.setTrips,
    //   setCurrTripId: this.setCurrTripId,
    //   addTrip: this.handleAddTrip,
    // };

    return (
      <div className="App">
          <Header />
          <main>
            {hasError && <p>There was an error! Oh no!</p>}
            <Switch>
              <PrivateRoute exact path={'/add-trip'} component={AddTripForm} />
              <Route path={'/my-trips'} component={MyTrips} />
              <Route exact path={'/'} component={DashboardRoute} />
              <Route path={'/trips/:trips_id'} component={TripView} />
              <PublicOnlyRoute
                path={'/register'}
                component={RegistrationRoute}
              />
              <PublicOnlyRoute path={'/login'} component={LoginRoute} />
              <Route component={NotFoundRoute} />
            </Switch>
          </main>
      </div>
    );
  }
}
