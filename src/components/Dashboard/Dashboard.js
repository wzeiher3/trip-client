import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import TripApiService from '../../services/trip-service';
import TripContext from '../../contexts/TripContext';
import TripCards from '../TripCards/TripCards';
import './Dashboard.css';

export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      searchQuery: '',
      filteredTrips: [],
      searchUpdated: true,
    };
  }

  static contextType = TripContext;
  // state is taking two key changes to fully update
  //
  setQuery = (e) => {
    let value = e.target.value;

    this.setState({
      filteredTrips: this.context.trips.filter((trip) => {
        return trip.destination.toLowerCase().includes(value.toLowerCase());
      }),
      searchUpdated: true,
    });
  };

  // shouldComponentUpdate = () => {
  //   if (this.state.searchUpdated === true) {
  //     return true;
  //     //   this.setState(
  //     //     {
  //     //       filteredTrips: this.context.trips.filter((trip) => {
  //     //         return trip.destination
  //     //           .toLowerCase()
  //     //           .includes(this.state.searchQuery.toLowerCase());
  //     //       }),
  //     //       searchUpdated: false,
  //     //     },
  //     //     () => this.forceUpdate()
  //     //   );
  //     //   return false;
  //     // }
  //   }
  //   return false;
  // };

  // filterTrips = (value) => {
  //   // const nonFilteredTrips = this.context.trips
  //   let query = value.toLowerCase()
  //   const filterTrips = this.context.trips.filter(trip => {
  //     return (
  //     trip.destination.toLowerCase().includes(query) || trip.short_description.includes(query))
  //     })
  //   console.log('this is filtered trips', filterTrips, 'and this is search query', query)
  //   this.setState({ filteredTrips: filterTrips }, this.forceUpdate())
  // }

  render() {
    console.log(this.state.searchQuery);
    console.log(this.state);
    console.log('Rendering...');
    // console.log(this.state.searchQuery);
    // let filteredTripCards = this.context.trips.filter((trip) => {
    //   if (this.state.searchQuery == null) return trip;
    //   else if (
    //     trip.destination
    //       .toLowerCase()
    //       .includes(this.state.searchQuery.toLowerCase())
    //   ) {
    //     return trip;
    //   }
    //   return console.log('Nothing!');
    // });
    let tripsToMap = [];
    if (this.state.filteredTrips.length > 0) {
      tripsToMap = this.state.filteredTrips;
    } else {
      tripsToMap = this.context.trips;
    }
    console.log(tripsToMap);
    let tripCards = tripsToMap.map((trip, index) => {
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
      );
    });
    return (
      <section className="Dashboard">
        <div className="upperSection">
          <div className="addTripButton">
            <Link to="/add-trip">
              <div className="myButton">Add a Trip!</div>
            </Link>
          </div>
          <div className="tripSearchBar">
            <label htmlFor="tripSearchBar">Search Bar</label>
            <input
              type="text"
              placeholder={'Search for a destination...'}
              name="tripSearchBar"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  this.setState({ searchUpdated: false });
                  this.setQuery(e);
                }
              }}
            ></input>
          </div>
          <div className="titleDiv"></div>
          <div className="myTripButton">
            <Link to="/my-trips">
              <div className="myButton">My Trips</div>
            </Link>
          </div>
        </div>
        <div className="lowerSection">
          {this.state.searchUpdated && tripCards}
        </div>
      </section>
    );
  }
}
