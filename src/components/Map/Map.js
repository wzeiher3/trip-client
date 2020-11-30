import React from 'react';
import { GoogleComponent } from 'react-google-location';
import { Map, GoogleApiWrapper, Marker, Listing } from 'google-maps-react';
import TripApiService from '../../services/trip-service';

import './Map.css';
import MAP_API_KEY from '../../config';
import images from '../../assets/images/images';

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [
        { lat: 47.49855629475769, lng: -122.14184416996333 },
        { latitude: 47.359423, longitude: -122.021071 },
        { latitude: 47.2052192687988, longitude: -121.988426208496 },
        { latitude: 47.6307081, longitude: -122.1434325 },
        { latitude: 47.3084488, longitude: -122.2140121 },
        { latitude: 47.5524695, longitude: -122.0425407 },
      ],

      currTrip: {},
    };
  }

  componentWillMount() {
    this.setState({
      currTrip: this.props.trip,
    });
  }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: store.latitude,
            lng: store.longitude,
          }}
          onClick={() => console.log('You clicked me!')}
        />
      );
    });
  };

  // setTrip = (trip) => {
  //   this.setState({
  //       currTrip: trip
  //   })
  // }

  render() {
    // this.setTrip(this.props.trip)
    // console.log(this.props.trip)

    const { lat, long } = this.state.currTrip;
    console.log(this.props.trip.lat, this.props.trip.long);

    if (!this.props.trip.lat || !this.props.trip.long)
      return (
        <img
          className="loading-img-map"
          src={images.loading}
          alt="loading icon"
        />
      );

    console.log(MAP_API_KEY);
    return (
      <Map
        key={long}
        google={this.props.google}
        zoom={10}
        style={mapStyles}
        containerStyle={containerStyle}
        initialCenter={{ lat: this.props.trip.lat, lng: this.props.trip.long }}
      >
        {/* {this.displayMarkers()} */}
      </Map>
    );
  }
}

const mapStyles = { height: '100%', position: 'relative' };

const containerStyle = {
  width: '100%',
  height: '550px',
  marginLeft: 0,
  position: 'relative',
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAqwvGJ4-Cdmo1KHAY-a8_CQpzcNPVRqY0',
})(MapContainer);
