import React, { Component } from 'react'
import TripContext from '../../contexts/TripContext'
import TripCards from '../TripCards/TripCards'
import TokenService from '../../services/token-service'


export default class MyTrips extends Component {
    static contextType = TripContext;

    render() {
        let jwt = TokenService.getAuthToken()
        const user = TokenService.parseJwt(jwt)
        console.log(user)

        // const userTrips = this.context.trips.filter((trip) => userID === trip.user_id)
        const tripCards = this.context.trips.map((trip, index) => {
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
                <h2>My Trips</h2>
                <hr />
                {tripCards}
            </section>

        )
    }
}
