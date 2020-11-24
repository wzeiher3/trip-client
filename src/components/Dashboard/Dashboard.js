import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import TripApiService from '../../services/trip-service';
import TripContext from '../../contexts/TripContext';
import TripCards from '../TripCards/TripCards';
import './Dashboard.css';

export default class Dashboard extends React.Component {
  constructor(){
    super();
    this.state = {
      error: null,
      searchQuery: null,
      filteredTrips: [],
    };
  }

  static contextType = TripContext;
  // state is taking two key changes to fully update
  // 
  setQuery = (e) => {
    let value = e.target.value
    if(e.keyCode === 13){
      console.log(value)
      this.setState({searchQuery: value}, () => this.handleTripFilter())
    }
  }

  handleTripFilter = () => {  
    // const nonFilteredTrips = this.context.trips
    let query = this.state.searchQuery.toLowerCase()
    let filterTrips = this.state.filteredTrips.filter(trip => {
      if(this.state.searchQuery == null) return trip
         else if (trip.destination.toLowerCase().includes(query.toLowerCase())) {
           return trip
         }
      }) 
    this.setState({ filteredTrips: filterTrips }, () => console.log('this is filtered trips', this.state.filteredTrips, 'and this is search query', query)
    )
  }



  componentDidMount() {
    TripApiService.getTrips()
      .then((res) => {
        this.context.setTrips(res);
        this.setState({filteredTrips: res})
      })
      .catch((error) => this.setState({ error: error }));
    } 

  render() {
    console.log('state in render', this.state)
    console.log('context', this.context.trips)
    // let tripCards = this.context.trips.filter((trip) => {
    //   if(this.state.searchQuery == null) return trip
    //   else if (trip.destination.toLowerCase().includes(this.state.searchQuery.toLowerCase())) {
    //     return trip
    //   }
    // }).map((trip, index) => {
    //   return (
    //     <TripCards
    //       key={index}
    //       id={trip.id}
    //       index={index}
    //       days={trip.days}
    //       rating={trip.rating}
    //       destination={trip.destination}
    //       activities={trip.activities}
    //       short_description={trip.short_description}
    //       image={trip.img}
    //     />
    //   );
    // });
    // console.log('trip cards in render', tripCards)
    return (
      <section className="Dashboard">
        <div className="upperSection">
          <div className="addTripButton">
            <Link to="/add-trip">
              <div className="myButton">Add a Trip!</div>
            </Link>
          </div>
          <div className="tripSearchBar">
            <label htmlFor="tripSearchBar" >Search Bar</label>
            <input
              type="text"
              placeholder={'Search for a destination...'}
              name="tripSearchBar"
              onKeyDown={this.setQuery}
            ></input>
          </div>
          <div className="titleDiv"></div>
          <div className="myTripButton">
            <Link to="/my-trips">
              <div className="myButton">My Trips</div>
            </Link>
          </div>
        </div>
    <div className="lowerSection">{this.state.filteredTrips.map((trip, index) => {
      return (
        <TripCards
          key={index}
          id={trip.id}
          index={index}
          days={trip.days}
          rating={trip.rating}
          destination={trip.destination}
          activities={trip.activities}
          short_description={trip.short_description}
          image={trip.img}
        />
      )
    })}</div>
      </section>
    );
  }
}
