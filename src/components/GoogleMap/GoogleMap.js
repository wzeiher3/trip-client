/* global google */

import React from 'react';
import config from '../../config';

export default class GoogleMap extends React.Component {
  getGoogleMaps() {
    // If we haven't already defined the promise, define it
    if (!this.googleMapsPromise) {
      this.googleMapsPromise = new Promise((resolve) => {
        // Add a global handler for when the API finishes loading
        window.resolveGoogleMapsPromise = () => {
          // Resolve the promise
          resolve(google);

          // Tidy up
          delete window.resolveGoogleMapsPromise;
        };

        // Load the Google Maps API
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${config.MAP_API_KEY}&libraries=localContext&v=beta&callback=resolveGoogleMapsPromise`;
        script.async = true;
        document.body.appendChild(script);
      });
    }

    // Return a promise for the Google Maps API
    return this.googleMapsPromise;
  }

  componentWillMount() {
    // Start Google Maps API loading since we know we'll soon need it
    this.getGoogleMaps();
  }

  componentDidMount() {
    // Once the Google Maps API has finished loading, initialize the map
    let map;
    this.getGoogleMaps().then((google) => {
      const uluru = { lat: -25.363, lng: 131.044 };
      const localContextMapView = new google.maps.localContext.LocalContextMapView(
        {
          element: document.getElementById('map'),
          placeTypePreferences: ['restaurant', 'tourist_attraction'],
          maxPlaceCount: 12,
        }
      );
      map = localContextMapView.map;
      map.setOptions({
        center: { lat: 51.507307, lng: -0.08114 },
        zoom: 14,
      });
    });
  }

  render() {
    return (
      <div onClick={(ev) => console.log(ev.target)}>
        <h1>Contact</h1>
        <div id="map" style={{ width: 800, height: 800 }}></div>
      </div>
    );
  }
}
