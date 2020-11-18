import React from 'react';
import TripService from '../../services/trip-service';
import TripContext from '../../contexts/TripContext';
// import { Label, Required, Input, Textarea} from '../Form/Form'

export default class AddTripForm extends React.Component {
  state = {
    short_description: '',
    activities: '',
    days: 0,
    rating: 0,
    destination: '',
    error: null,
  };

  static contextType = TripContext;

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ error: null });
    const { short_description, destination, days, activities } = e.target;
    // this.setState({
    //   short_description: title,
    //   days: days,
    //   activities: activities,
    // });
    let trip = {
      destination: destination.value,
      short_description: short_description.value,
      days: days.value,
      activities: activities.value,
    };
    let currentTrips = this.context.trips;
    TripService.postTrip(trip)
      .then((res) => {
        this.context.setTrips([res, ...currentTrips]);
        this.props.history.push('/');
      })
      .catch((error) => {
        this.setState({ error });
      });
    console.log(this.context.trips);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="destination">Input the name of your destination!</label>
        <input type="text" name="destination" />
        <label htmlFor="short_description">
          Input a short description of your destination!
        </label>
        <input type="text" name="short_description" />
        <label htmlFor="days">
          How many days does your trip take to complete?
        </label>
        <input type="number" name="days" />
        <label htmlFor="activities">
          What kind of activities do you do on your trip?
        </label>
        <input type="text" name="activities" />
        <button className="myButton" type="submit">
          Submit!
        </button>
      </form>
    );
  }
}
