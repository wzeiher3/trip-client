'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import TripService from '../../services/trip-service'
import TripContext from '../../contexts/TripContext'

export default class Dashboard extends React.Component{
    state = {
        error: null,
    }
   

static contextType = TripContext;

componentDidMount(){
    TripService.getTrips()
        .then((res) => {
            this.context.setTrips(res)
        })
        .catch((error) => this.setState({error: error}))
}


render(){
    return (
        <section className="Dashboard">
            <div className="upperSection">
                 <div className="addTripButton">
                    <p>add Trip button</p>
                 </div> 
                 <div className="titleDiv">
                    <p>Title/Info space</p>
                 </div>
                 <div className="myTripsButton">
                    <p>new trip</p>
                 </div>
            </div> 
            <div className="lowerSection">
                {this.context.trips.map((trip, index) => {
                    <Trip  
                        id = {trip.id}
                        key = {index}
                        rating = {trip.rating}
                        destination = {trip.destination}
                        trip_title = {trip.trip_title}
                    />
                })}
            </div>
        </section>
    )
}