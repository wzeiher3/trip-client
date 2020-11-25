import React from 'react';
import TripApiService from '../../services/trip-service';
import TripContext from '../../contexts/TripContext';
import MapContainer from '../Map/Map'
import { Link } from 'react-router-dom';
import './TripView.css';

export default class Trip extends React.Component {
  static contextType = TripContext;

  state = {
    stops: [],
    trip: [{ user_id: 0, short_description: 'Add a Stop!'}],
    currTripID: 0,
    tripDescription: '',
    formExpanded: false,
    updated: false,
  };

  componentDidMount() {
    // get trip ID
    const { match } = this.props;
    // set trip_id variable
    const trip_id = match.params.trips_id;
    // get stops for the current trip
    TripApiService.getTrip(trip_id)
      .then((res) => {
        this.setState({ trip: res, currTripID: res.id });
      })
      .catch((error) => {
        console.error(error);
      });
    TripApiService.getStops(trip_id)
      .then((res) => {
        this.setState({ stops: res });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // componentWillMount(){
  //   const { match } = this.props;
  //   // set trip_id variable
  //   const trip_id = match.params.trips_id;

  //   const trip = TripApiService.getTrip(trip_id)
  // }

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
      longitude: -32.77779,
      latitude: 46.888888,
      city: city.value,
      state: state.value,
      stop_name: stop_name.value,
      description: description.value,
      category: category.value,
    };

    TripApiService.postStop(stop)
      .then((res) => {
        this.setState({
          stops: [...this.state.stops, res],
          formExpanded: false,
        });
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  isTripCreator = () => {
    let isTripCreator = false;
    isTripCreator = this.context.verifyAuth(this.state.trip[0].user_id);
    return isTripCreator;
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

  handleDeleteStop = (stop_id) => {
    TripApiService.deleteStop(stop_id)
      .then(() => {
        this.setState({
          stops: this.state.stops.filter((stop) => stop_id !== stop.id),
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
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
          {this.isTripCreator() && (
            <button onClick={() => this.handleDeleteStop(stop.id)}>
              Delete Stop
            </button>
          )}
        </div>
      );
    });

    const { match } = this.props;
    // set trip_id variable
    const trip_id = match.params.trips_id;

    console.log("This Trip", this.state.trip[0])

    return (
      <div className="trip">
        <div id="Map"><MapContainer trip={this.state.trip[0]}/></div>
        <h2 className="trip-name">{this.state.trip[0].short_description}</h2>
        {stops}

        {this.state.formExpanded ? this.renderStopForm() : null}

        {this.isTripCreator() && (
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
