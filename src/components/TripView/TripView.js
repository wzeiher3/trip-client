import React from 'react';
import TripApiService from '../../services/trip-service';
import TripContext from '../../contexts/TripContext';
import { Link } from 'react-router-dom';
import './TripView.css';

export default class Trip extends React.Component {
  static contextType = TripContext;

  state = {
    stops: [{ user_id: 0, short_description: 'Add a Stop!' }],
    currTripID: 0,
    // trip: {
    //   user_id: 0,
    //   short_description: '',
    // },
    tripDescription: '',
    formExpanded: false,
    updated: false,
  };

  // componentDidUpdate() {
  //   if (this.state.trip.user_id === 0 && this.context.trips.length !== 0) {
  //     this.setState({ trip: this.context.trips[this.state.currTripID - 1] });
  //   }
  // }

  componentDidMount() {
    // get trip ID
    const { match } = this.props;
    // set trip_id variable
    const trip_id = match.params.trips_id;
    // get stops for the current trip
    TripApiService.getStops(trip_id).then((res) => {
      if (res.length >= 1) {
        this.setState({ stops: [...res], currTripID: trip_id });
      } else {
        this.setState({
          stops: [{ user_id: 0, short_description: 'Add a Stop!' }],
          currTripID: trip_id,
        });
      }
      // set the state with stops, currTripID
    });
  }

  updateState = () => {
    this.setState({ formExpanded: !this.state.formExpanded });
  };

  handleSubmitStop = (e) => {
    e.preventDefault();
    this.setState({ error: null });
    const { stop_name, description, category, city, state } = e.target;

    const { match } = this.props;
    // set trip_id variable

    let tripId = match.params.trips_id;
    let stop = {
      trip_id: tripId,
      longitude: 'temp',
      latitude: 'temp',
      city: city.value,
      state: state.value,
      stop_name: stop_name.value,
      description: description.value,
      category: category.value,
    };

    TripApiService.postStop(stop)
      .then((res) => {
        let currentStops = this.state.stops;
        this.setState({
          stops: [...currentStops, res],
          formExpanded: false,
        });
      })
      .catch((error) => {
        this.setState({ error });
      });
    // this.setState({updated: !this.state.updated});
  };

  renderStopForm = () => {
    return (
      <form onSubmit={this.handleSubmitStop}>
        <label htmlFor="stop_name">Input the name of your stop!</label>
        <input type="text" name="stop_name" />
        <label htmlFor="city">City</label>
        <input type="text" name="city" />
        <label htmlFor="state">State</label>
        <input type="text" name="state" />
        <label htmlFor="category">What kind of stop is this?</label>
        <input type="text" name="category" />
        <label htmlFor="description">Input any notes about your stop</label>
        <input type="text" name="description" />
        <button
          className="myButton"
          type="submit"
          onClick={(e) => this.handleSubmitStop}
        >
          Submit!
        </button>
      </form>
    );
  };

  render() {
    // get user id from context
    // check id with verify auth
    // console.log(this.context.trips[10].user_id)
    let isTripCreator = false;
    if (this.props.isLoaded === true) {
      isTripCreator = this.context.verifyAuth(
        this.context.trips[this.props.match.params.trips_id - 1].user_id
      );
    }
    const stops = this.state.stops.map((stop, index) => {
      return (
        <div className="trip-stop" key={index}>
          <div className="trip-header">
            <h2>{stop.stop_name}</h2>
            <span>
              {stop.city}, {stop.state}
            </span>
          </div>
          <p>{stop.description}</p>
        </div>
      );
    });
    return (
      <div className="trip">
        <h2 className="trip-name">{this.state.stops[0].short_description}</h2>
        {stops}

        {this.state.formExpanded ? this.renderStopForm() : null}

        {isTripCreator && (
          <div className="addStopButton">
            <div
              className="myButton"
              onClick={() => {
                this.setState({ formExpanded: !this.state.formExpanded });
              }}
            >
              Add a Stop!
            </div>
          </div>
        )}
      </div>
    );
  }
}

// category: "tourist_attraction"
// city: "Orlando"
// description: "The Walt Disney World Resort, also called Walt Disney World and Disney World, is an entertainment complex in Bay Lake and Lake Buena Vista, Florida, in the United States, near the cities of Orlando and Kissimmee."
// id: 7
// latitude: "28.3852"
// longitude: "-81.5639"
// state: "FL"
// stop_name: "Disneyworld"
// trip_id: 1
