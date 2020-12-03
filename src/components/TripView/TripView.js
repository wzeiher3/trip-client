import React from 'react';
import TripApiService from '../../services/trip-service';
import TripContext from '../../contexts/TripContext';
import TripViewNav from './TripViewNav/TripViewNav';
import TripViewSelect from './TripViewSelect/TripViewSelect';
import TripViewEditSelect from './TripViewEditSelect.js/TripViewEditSelect';

import MapContainer from '../Map/Map';
import AddStopForm from './AddStopForm.js/AddStopForm';
import Helpers from '../../helpers/helpers';
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
    userHasRated: false,
  };

  componentDidMount() {
    const { match } = this.props;
    const trip_id = match.params.trips_id;
    this.userHasRated();
    this.context.setLoading(true);
    TripApiService.getTrip(trip_id)
      .then((res) => {
        this.setState({ trip: res, currTripID: res.id });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.context.setLoading(false);
      });
    this.context.setLoading(true);
    TripApiService.getStops(trip_id)
      .then((res) => {
        this.setState({ stops: res });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.context.setLoading(false);
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
    this.context.setLoading(true);
    TripApiService.deleteTrip(this.state.trip[0].id)
      .then(() => {
        this.context.setTrips(
          this.context.trips.filter((trip) => trip.id !== this.state.trip[0].id)
        );
        this.props.history.push('/dashboard');
      })
      .catch((error) => {
        this.setState({ error: error });
      })
      .finally(() => {
        this.context.setLoading(false);
      });
  };

  handleEditTrip = () => {
    this.setState({ toggleEditTrip: true });
  };

  handleSubmitEditedTrip = (e, id) => {
    e.preventDefault();
    const { short_description, activities, days } = e.target;
    let trip = {
      short_description: short_description.value,
      activities: activities.value,
      days: days.value,
    };
    this.context.setLoading(true);
    TripApiService.patchTrip(trip, id)
      .then((res) => {
        this.setState({ trip: res });
      })
      .catch((error) => {
        this.setState({ error });
      })
      .finally(() => {
        this.context.setLoading(false);
        this.setState({ toggleEditTrip: false });
      });
  };

  handleSubmitEditStop = async (e, stop_id) => {
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
    this.context.setLoading(true);
    const res = await Helpers.flickrApi(stop_name.value, city.value);
    stop.img = Helpers.generateFlikrLink(res);
    TripApiService.patchStop(stop, stop_id)
      .then((res) => {
        const stops = this.state.stops.filter((stop) => stop.id !== res.id);
        this.setState({
          stops: [...stops, res],
        });
      })
      .catch((error) => {
        this.setState({ error });
      })
      .finally(() => {
        this.context.setLoading(false);
      });
  };

  handleSubmitStop = async (e) => {
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
    this.context.setLoading(true);
    const res = await Helpers.flickrApi(stop_name.value, city.value);
    stop.img = Helpers.generateFlikrLink(res);
    TripApiService.postStop(stop)
      .then((res) => {
        this.setState({
          stops: [...this.state.stops, res],
          toggleAddStop: false,
        });
      })
      .catch((error) => {
        this.setState({ error });
      })
      .finally(() => {
        this.context.setLoading(false);
      });
  };

  handleRating = () => {
    const trip_id = this.props.match.params.trips_id;
    const user_id = this.context.returnUserID();
    const rate = 1;
    const rating = { trip_id, user_id, rate };
    TripApiService.postRating(rating)
      .then(() => {
        this.setState({
          trip: [
            {
              ...this.state.trip[0],
              rating: Number(this.state.trip[0].rating) + 1,
            },
          ],
          userHasRated: true,
        });
        this.context.setTripRating(trip_id);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  userHasRated = () => {
    const trip_id = this.props.match.params.trips_id;
    const user_id = this.context.returnUserID();
    this.context.setLoading(true);
    TripApiService.checkUserHasRated(trip_id)
      .then((res) => {
        for (let i = 0; i < res.length; i++) {
          if (res[i].user_id === user_id) {
            this.setState({ userHasRated: true });
            this.context.setLoading(false);
            return;
          }
        }
      })
      .catch((error) => {
        this.setState({ error: error });
      })
      .finally(() => {
        this.context.setLoading(false);
      });
  };

  isTripCreator = () => {
    let isTripCreator = this.context.verifyAuth(this.state.trip[0].user_id);
    return isTripCreator;
  };

  renderEditTrip = (trip) => {
    return (
      <div className="edit-trip">
        <form onSubmit={(e) => this.handleSubmitEditedTrip(e, trip.id)}>
          <h2 className="trip-name">{trip.destination}</h2>
          <br />
          <input
            defaultValue={trip.short_description}
            name="short_description"
            maxLength={30}
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

  renderStop(stop, index) {
    if (!stop.img) stop.img = images.no_camera;
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
          <div className="trip-flex">
            <div className="trip-left">
              <img className="flikr-img" src={stop.img} alt={stop.stop_name} />
            </div>
            <div className="trip-right">
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
                    <b>Category: </b>
                    {stop.category.replace('_', ' ')}
                  </span>
                </div>
              </a>
            </div>
            <div className="stop-description">{stop.description}</div>
          </div>
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
  }

  renderEditStopForm = (stop, index) => {
    const id = stop.id;
    return (
      <div className="trip-stop-wrapper" key={stop.id}>
        <div className="trip-stop edit-stop" key={index}>
          {this.context.loading && (
            <div className="bufffer-img-wrapper ">
              <img
                className="buffer-img"
                src={images.img_loading}
                alt="a plane flying over hearts loading gif"
              />
              <div className="fade-out-screen"></div>
            </div>
          )}
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
    return (
      <>
        <div className="trip">
          <div className="tripView-upperSection">
            <div className="trip-info">
              {this.state.toggleEditTrip ? (
                this.renderEditTrip(trip)
              ) : (
                <>
                  <span className="rating-container">
                    {!this.state.userHasRated ? (
                      <>
                        <button
                          className="like-btn"
                          onClick={() => this.handleRating()}
                        >
                          <img
                            alt="unliked heart"
                            className="empty-heart heart"
                            src={images.EmptyHeart}
                          ></img>
                        </button>
                        <span className="trip-rating-digits">
                          {trip.rating}
                        </span>
                      </>
                    ) : (
                      <>
                        <button className="like-btn">
                          <img
                            alt="liked heart"
                            className="filled-heart heart"
                            src={images.FilledHeart}
                          ></img>
                        </button>
                        <span className="trip-rating-digits">
                          {trip.rating}
                        </span>
                      </>
                    )}
                  </span>
                  <h2 className="trip-name">{trip.destination}</h2>
                  <p>{trip.short_description}</p>
                  <p>
                    <span>Activities:</span> {trip.activities} <br />
                    <span>Days:</span> {trip.days}
                  </p>
                </>
              )}
            </div>

            <div id="Map">
              <MapContainer trip={this.state.trip[0]} />
            </div>
          </div>

          <TripViewNav
            handleDeleteTrip={this.handleDeleteTrip}
            handleEditTrip={this.handleEditTrip}
            stops={this.state.stops}
            user_id={this.state.trip[0].user_id}
          />
          <div className="belowMap">
            {stops.length ? (
              stops
            ) : (
              <h4>
                This user hasn't added any stops yet! If this is your trip, add
                some by clicking the Add Stop button!
              </h4>
            )}
            {this.state.toggleAddStop && (
              <AddStopForm
                handleSubmitStop={this.handleSubmitStop}
                handleSelect={this.handleSelect}
                clearSelections={this.clearSelections}
                selections={this.state.selections}
                error={this.state.error}
                toggleAddStop={this.toggleAddStop}
              />
            )}
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
        </div>
      </>
    );
  }
}
