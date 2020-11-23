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

  static contextType = TripContext
  state = {
    hasError: false,
    isLoaded: false,
  };

  static contextType = TripContext;

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  componentDidMount = () => {
    TripApiService.getTrips()
      .then((res) => {
        this.context.setTrips(res);
      })
      .then(res => {
        this.setState({ isLoaded: true })
        }
      )
      .catch((error) => this.setState({ error: error }));
  };

  render() {
    console.log('Latest');
    const { hasError } = this.state;

    return (
      <div className="App">
        <Header />
        <main>
          {hasError && <p>There was an error! Oh no!</p>}
          <Switch>
            <PrivateRoute exact path={'/add-trip'} component={AddTripForm} />
            <PrivateRoute path={'/my-trips'} component={MyTrips} />
            <Route exact path={'/'} component={DashboardRoute} />
            <Route path={'/trips/:trips_id'} render={(props) => (
              <TripView {...props} isLoaded={this.state.isLoaded}
              />
             )} />
            <PublicOnlyRoute path={'/register'} component={RegistrationRoute} />
            <PublicOnlyRoute path={'/login'} component={LoginRoute} />
            <Route component={NotFoundRoute} />
          </Switch>
        </main>
      </div>
    );
  }
}
