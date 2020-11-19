import React, { Component } from 'react'
import TripContext from '../../contexts/TripContext'
import TripCards from '../TripCards/TripCards'
import TokenService from '../../services/token-service'
import './MyTrips.css'


export default class MyTrips extends Component {
    static contextType = TripContext;

    render() {
        let jwt = TokenService.getAuthToken()
        const user = TokenService.parseJwt(jwt)
        // console.log(user)
        const userTrips = this.context.trips.filter(trip => trip.user_id === user.user_id)
        // console.log(userTrips)
        const tripCards = userTrips.map((trip, index) => {
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
            <section className="my-trips">
                <div className="my-trips-header">

                <h2>My Trips</h2>
                <hr />
                </div>
                <div className="trip-cards">
                {tripCards}
                </div>
            </section>

        )
    }
}
