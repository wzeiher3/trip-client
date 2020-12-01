import React, { Component } from 'react';
import './DirectionsLink.css';

class DirectionsLink extends Component {
  render() {
    const link = this.props.stops.map((stop, index) => {
      if (index === 0 && this.props.stops < 3) {
        return `${stop.stop_name}+${stop.city}+${stop.state}`;
      }
      if (index === 0 && this.props.stops > 2) {
        return `${stop.stop_name}+${stop.city}+${stop.state}&waypoints=`;
      }
      if (index === this.props.stops.length - 1) {
        return `&destination=${stop.stop_name}+${stop.city}+${stop.state}`;
      }
      if (index === this.props.stops.length - 2) {
        return `${stop.stop_name}+${stop.city}+${stop.state}`;
      }
      return `${stop.stop_name}+${stop.city}+${stop.state}%7C`;
    });
    return (
      <>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href={`https://www.google.com/maps/dir/?api=1&origin=${link.join(
            ','
          )}`}
        >
          <div className="myButton nav-buttons">Get Directions</div>
        </a>
      </>
    );
  }
}

export default DirectionsLink;
