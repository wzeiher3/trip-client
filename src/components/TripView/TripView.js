import React from 'react';
import TripApiService from '../../services/trip-service';
import TripContext from '../../contexts/TripContext';
import { Link } from 'react-router-dom';
import TripViewNav from './TripViewNav/TripViewNav';
import './TripView.css';

import images from '../../assets/images/images';

export default class Trip extends React.Component {
  static contextType = TripContext;

  state = {
    stops: [],
    trip: [{ user_id: 0, short_description: 'Add a Stop!' }],
    currTripID: 0,
    tripDescription: '',
    toggleAddStop: false,
    stopEditingID: 0,
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

  toggleAddStop = () => {
    this.setState({ toggleAddStop: !this.state.toggleAddStop });
  };

  toggleEditStop = (stop_id) => {
    this.setState({
      stopEditingID: stop_id,
    });
  };

  handleDeleteTrip = () => {
    TripApiService.deleteTrip(this.state.trip[0].id).then(() => {
      this.context.setTrips(
        this.context.trips.filter((trip) => trip.id !== this.state.trip[0].id)
      );
      this.props.history.push('/');
    });
  };

  handleSubmitEditStop = (e, stop_id) => {
    e.preventDefault();
    this.setState({ error: null, stopEditingID: 0 });
    const { stop_name, description, category, city, state } = e.target;
    const { match } = this.props;
    let tripId = match.params.trips_id;
    let stop = {
      trip_id: tripId,
      longitude: 0,
      latitude: 0,
      city: city.value,
      state: state.value,
      stop_name: stop_name.value,
      description: description.value,
      category: category.value,
    };

    TripApiService.patchStop(stop, stop_id)
      .then((res) => {
        const stops = this.state.stops.filter((stop) => stop.id !== res.id);
        this.setState({
          stops: [...stops, res],
        });
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  handleSubmitStop = (e) => {
    e.preventDefault();
    this.setState({ error: null });
    const { stop_name, description, category, city, state } = e.target;
    const { match } = this.props;
    let tripId = match.params.trips_id;
    let stop = {
      trip_id: tripId,
      longitude: 0,
      latitude: 0,
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
          toggleAddStop: false,
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

  renderAddStopForm = () => {
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
          className="tripViewButton"
          type="button"
          onClick={(e) => this.toggleAddStop(e)}
        >
          Cancel
        </button>
        <button
          className="tripViewButton"
          type="submit"
          onClick={(e) => this.handleSubmitStop}
        >
          Submit!
        </button>
      </form>
    );
  };

  renderStop = (stop, index) => {
    return (
      <div className="trip-stop-wrapper" key={stop.id}>
        <div className="trip-stop trip-div">
          <figcaption>
            {this.isTripCreator() && (
              <div className="tripView-button-wrapper">
                <button
                  className="tripViewButton"
                  onClick={() => this.toggleEditStop(stop.id)}
                >
                  Edit Stop
                </button>
                <button
                  className="tripViewButton"
                  onClick={() => this.handleDeleteStop(stop.id)}
                >
                  Delete Stop
                </button>
              </div>
            )}
          </figcaption>
          <div
            className={
              this.isTripCreator() ? 'trip-header-creator' : 'trip-header'
            }
          >
            <h2>{stop.stop_name}</h2>
            <span>
              {stop.city}, {stop.state}
            </span>
            <br />
            <span className="trip-category">
              Category: {stop.category.replace('_', ' ')}
            </span>
          </div>
          <p>{stop.description}</p>
        </div>
        <br />
        {index === this.state.stops.length - 1 ? null : index % 2 !== 0 ? (
          <img src={images.road_a} alt="road illustration"></img>
        ) : (
          <img src={images.road_b} alt="road illustration"></img>
        )}
      </div>
    );
  };

  renderEditStopForm = (stop, index) => {
    const id = stop.id;
    return (
      <div className="trip-stop-wrapper" key={stop.id}>
        <div className="trip-stop  trip-div" key={index}>
          <form
            action="#"
            id="EditStopForm"
            onSubmit={(e) => this.handleSubmitEditStop(e, id)}
          >
            <div className="trip-header">
              <input
                defaultValue={stop.stop_name}
                name="stop_name"
                id="edit_stop_name"
                aria-label="stop_name"
              />{' '}
              <br />
              <input defaultValue={stop.city} name="city" aria-label="city" />
              <br />
              <input
                defaultValue={stop.state}
                name="state"
                aria-label="state"
              />
            </div>
            <input
              defaultValue={stop.category}
              name="category"
              aria-label="category"
            ></input>
            <br />
            <input
              defaultValue={stop.description}
              name="description"
              aria-label="description"
            />
            {this.isTripCreator() && (
              <div className="tripView-button-wrapper">
                <button
                  className="tripViewButton"
                  onClick={() => this.toggleEditStop(0)}
                >
                  Cancel
                </button>
                <button className="tripViewButton" type="submit">
                  Submit
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
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
    const trip = this.state.trip[0];
    const stops = this.state.stops.map((stop, index) => {
      if (stop.id === this.state.stopEditingID) {
        return this.renderEditStopForm(stop, index);
      }
      return this.renderStop(stop, index);
    });
    return (
      <>
        {this.isTripCreator() && (
          <TripViewNav handleDeleteTrip={this.handleDeleteTrip} />
        )}
        <div className="trip">
          <h2 className="trip-name">{trip.destination}</h2>
          <span>
            Rating: {trip.rating}
            {!trip.rating && <>N\A</>}
          </span>
          <p>{trip.short_description}</p>
          <p>
            Activities: {trip.activities} <br />
            Days: {trip.days}
          </p>
          {stops}
          {this.state.toggleAddStop && this.renderAddStopForm()}
          {!this.state.toggleAddStop && this.isTripCreator() && (
            <div className="addStopButton">
              <div
                className="myButton"
                onClick={() => {
                  this.setState({ toggleAddStop: !this.state.toggleAddStop });
                }}
              >
                Add a Stop!
              </div>
            </div>
          )}
        </div>
      </>
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
