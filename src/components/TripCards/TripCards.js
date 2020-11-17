import React, { Component } from "react";
import images from "../../assets/images/images";

import "./TripCards.css";

export default class TripCards extends Component {
  render() {
    return (
      <>
        <div className="TripCard">
          <div className="TripCard-topimage">
            <img src={images.city} alt="city skyline"></img>
          </div>
          <br />
          <div className="TripCard-title">
            <h2>Philadelphia rules!</h2>
          </div>
          <div className="Categories">
            <p>Categories: Tourist Attraction, Restaurants</p>
          </div>
          <div className="TripCard-bottom">
            <div className="TripCard-days">Days: 2</div>
          </div>
        </div>
      </>
    );
  }
}
