import React from 'react';
import TripApiService from '../../services/trip-service';
import TripContext from '../../contexts/TripContext';
import TripViewNav from './TripViewNav/TripViewNav';
import TripViewSelect from './TripViewSelect/TripViewSelect';
import TripViewEditSelect from './TripViewEditSelect.js/TripViewEditSelect';
import MapContainer from '../Map/Map';
import DirectionsLink from './DirectionsLink/DirectionsLink';

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
    toggleEditTrip: false,
    selections: [],
    error: null,
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

  toggleEditStop = (stop_id, stop_categories) => {
    if (stop_id !== 0) {
      this.setState({
        stopEditingID: stop_id,
        selections: stop_categories.split(','),
      });
    } else {
      this.setState({
        stopEditingID: stop_id,
      });
    }
  };

  handleSelect = (e) => {
    let selection = e.target;
    selection = selection.innerHTML;
    const findSelect = this.state.selections.includes(selection);
    if (findSelect) {
      this.setState({
        selections: [
          ...this.state.selections.filter((select) => {
            return select !== selection;
          }),
        ],
      });
    } else {
      this.setState({ selections: [...this.state.selections, selection] });
    }
  };

  clearSelections = () => {
    this.setState({ selections: [] });
  };

  handleDeleteTrip = () => {
    TripApiService.deleteTrip(this.state.trip[0].id).then(() => {
      this.context.setTrips(
        this.context.trips.filter((trip) => trip.id !== this.state.trip[0].id)
      );
      this.props.history.push('/');
    });
  };

  handleEditTrip = () => {
    this.setState(
      { toggleEditTrip: true },
      console.log(this.state.toggleEditTrip)
    );
  };

  handleSubmitEditedTrip = (e, id) => {
    e.preventDefault();
    const { destination, short_description, activities, days } = e.target;
    let trip = {
      short_description: short_description.value,
      destination: destination.value,
      activities: activities.value,
      days: days.value,
    };

    TripApiService.patchTrip(trip, id)
      .then((res) => {
        this.setState({ trip: res });
      })
      .catch((error) => {
        this.setState({ error });
      });

    this.setState({ toggleEditTrip: false });
  };

  handleSubmitEditStop = (e, stop_id) => {
    e.preventDefault();
    if (this.state.selections.length === 0) {
      this.setState({ error: 'Must select atleast 1 Category' });
      return;
    }
    this.setState({
      error: null,
      stopEditingID: 0,
    });
    const { stop_name, description, city, state } = e.target;
    const { match } = this.props;
    let tripId = match.params.trips_id;
    let stop = {
      trip_id: tripId,
      longitude: 0.0,
      latitude: 0.0,
      city: city.value,
      state: state.value,
      stop_name: stop_name.value,
      description: description.value,
      category: this.state.selections.join(', '),
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
    if (this.state.selections.length === 0) {
      this.setState({ error: 'Must select atleast 1 Category' });
      return;
    }
    this.setState({ error: null });
    const { stop_name, description, city, state } = e.target;
    const { match } = this.props;
    let tripId = match.params.trips_id;
    let stop = {
      trip_id: tripId,
      longitude: -32.77779,
      latitude: 46.888888,
      city: city.value,
      state: state.value,
      stop_name: stop_name.value,
      description: description.value,
      category: this.state.selections.join(', '),
    };

    TripApiService.postStop(stop)
      .then((res) => {
        console.log(res);
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
      <form
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.preventDefault();
        }}
        className="addStopForm"
        onSubmit={this.handleSubmitStop}
      >
        <h2>Add Stop</h2>
        <br />
        <label htmlFor="stop_name">Describe your stop with a name!</label>
        <input type="text" name="stop_name" required maxLength={40} />
        <label htmlFor="city">City</label>
        <input type="text" name="city" required maxLength={40} />
        <label htmlFor="state">State or Country</label>
        <input type="text" name="state" required maxLength={40} />
        {this.state.error && (
          <>
            <br />
            {this.state.error}
            <br />
            <br />
          </>
        )}
        <label htmlFor="category">What category of stop is this?</label>
        <br />
        <TripViewSelect
          handleSelect={this.handleSelect}
          clearSelections={this.clearSelections}
          selections={this.state.selections}
        />
        <br />
        <label htmlFor="description">Describe the experience to expect:</label>
        <input type="text" name="description" required maxLength={400} />
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

  renderEditTrip = (trip) => {
    return (
      <div className="edit-trip">
        <form onSubmit={(e) => this.handleSubmitEditedTrip(e, trip.id)}>
          <div className="edit-trip-destination">
            <input
              defaultValue={trip.destination}
              name="destination"
              maxLength={14}
            ></input>
          </div>
          <br />
          <input
            defaultValue={trip.short_description}
            name="short_description"
            maxLength={40}
            required
          ></input>
          <br />

          <input
            defaultValue={trip.activities}
            name="activities"
            maxLength={40}
            required
          ></input>
          <br />

          <input
            defaultValue={trip.days}
            type="number"
            min={0}
            name="days"
            max={99}
            required
          />
          <div className="edit-trip-button-container">
            <button
              className="tripViewButton"
              onClick={() => this.setState({ toggleEditTrip: false })}
            >
              Cancel
            </button>
            <button className="tripViewButton" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
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
                  onClick={() => this.toggleEditStop(stop.id, stop.category)}
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
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={`https://www.google.com/maps/search/?api=1&query=${stop.stop_name}+${stop.city}+${stop.state}`}
          >
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
          </a>
          <p>{stop.description}</p>
        </div>
        <br />
        {index === this.state.stops.length - 1 ? null : index % 2 !== 0 ? (
          <img
            className="road-img"
            src={images.road_a}
            alt="road illustration"
          ></img>
        ) : (
          <img
            className="road-img"
            src={images.road_b}
            alt="road illustration"
          ></img>
        )}
      </div>
    );
  };

  renderEditStopForm = (stop, index) => {
    const id = stop.id;
    return (
      <div className="trip-stop-wrapper" key={stop.id}>
        <div className="trip-stop edit-stop" key={index}>
          <form
            action="#"
            id="EditStopForm"
            onSubmit={(e) => this.handleSubmitEditStop(e, id)}
          >
            <div className="trip-header">
              <div>
                <input
                  defaultValue={stop.stop_name}
                  name="stop_name"
                  id="edit_stop_name"
                  aria-label="stop_name"
                  maxLength={40}
                  required
                />{' '}
              </div>
              <input
                defaultValue={stop.city}
                name="city"
                aria-label="city"
                maxLength={40}
                required
              />
              <br />
              <input
                defaultValue={stop.state}
                name="state"
                aria-label="state"
                maxLength={40}
                required
              />
            </div>
            {this.state.error && (
              <>
                <br />
                {this.state.error}
                <br />
                <br />
              </>
            )}
            <TripViewEditSelect
              handleSelect={this.handleSelect}
              clearSelections={this.clearSelections}
              selections={this.state.selections}
            />
            <input
              defaultValue={stop.description}
              name="description"
              aria-label="description"
              maxLength={400}
              required
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
        <br />
        {index === this.state.stops.length - 1 ? null : index % 2 !== 0 ? (
          <img
            className="road-img"
            src={images.road_a}
            alt="road illustration"
          ></img>
        ) : (
          <img
            className="road-img"
            src={images.road_b}
            alt="road illustration"
          ></img>
        )}
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
    const { match } = this.props;
    // set trip_id variable
    const trip_id = match.params.trips_id;

    console.log('This Trip', this.state.trip[0]);

    return (
      <>
        {this.isTripCreator() && (
          <TripViewNav
            handleDeleteTrip={this.handleDeleteTrip}
            handleEditTrip={this.handleEditTrip}
          />
        )}
        <div className="trip">
          {this.state.toggleEditTrip ? (
            this.renderEditTrip(trip)
          ) : (
            <>
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
            </>
          )}
          <div id="Map">
            <MapContainer trip={this.state.trip[0]} />
          </div>
          <div className="belowMap">
            {stops}
            {this.state.toggleAddStop && this.renderAddStopForm()}
            {!this.state.toggleAddStop && this.isTripCreator() && (
              <div className="addStopButton">
                <br />
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
          <DirectionsLink stops={this.state.stops} />
        </div>
      </>
    );
  }
}

