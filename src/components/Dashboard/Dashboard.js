import React from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";
import TripService from "../../services/trip-service";
import TripContext from "../../contexts/TripContext";
import TripCards from "../TripCards/TripCards";

import "./Dashboard.css";

export default class Dashboard extends React.Component {
  state = {
    error: null,
  };

  static contextType = TripContext;

  componentDidMount() {
    TripService.getTrips()
      .then((res) => {
        this.context.setTrips(res);
      })
      .catch((error) => this.setState({ error: error }));
  }

  render() {
    console.log(this.context);
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
          <TripCards />;
        </div>
      </section>
    );
  }
}
