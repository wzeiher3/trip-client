import React from 'react';
import TripService from '../../services/trip-service';
import TripContext from '../../contexts/TripContext';
// import { Label, Required, Input, Textarea} from '../Form/Form'

export default class AddTripForm extends React.Component {
//   state = {
//     description: '',
//     category: '',
//     days: 0,
//     rating: 0,
//     stop_name: '',
//     error: null,
//   };

  static contextType = TripContext;

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ error: null });
    const { stop_name, description, category } = e.target;


    let stop = {
      stop_name: stop_name.value,
      description: description.value,
      category: category.value,
    };
    let currentStops = this.context.stops;
    let tripId = this.context.currTripId;
    TripService.postStop(tripId, stop)
      .then((res) => {
        this.context.setStops([res, ...currentStops]);
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
        <label htmlFor="stop_name">Input the name of your stop!</label>
        <input type="text" name="stop_name" />
        <label htmlFor="description">
          Input a short description of your stop
        </label>
        <input type="text" name="description" />
        <label htmlFor="days">
          How many days does your trip take to complete?
        </label>
        <input type="number" name="days" />
        <label htmlFor="category">
          What kind of category do you do on your trip?
        </label>
        <input type="text" name="category" />
        <button className="myButton" type="submit">
          Submit!
        </button>
      </form>
    );
  }
}
