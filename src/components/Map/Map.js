import React from 'react';
import { GoogleComponent } from 'react-google-location';
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import TripApiService from "../../services/trip-service"
import './Map.css'
const API_KEY = 'AIzaSyAqwvGJ4-Cdmo1KHAY-a8_CQpzcNPVRqY0';

export class MapContainer extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        stores: [{lat: 47.49855629475769, lng: -122.14184416996333},
                {latitude: 47.359423, longitude: -122.021071},
                {latitude: 47.2052192687988, longitude: -121.988426208496},
                {latitude: 47.6307081, longitude: -122.1434325},
                {latitude: 47.3084488, longitude: -122.2140121},
                {latitude: 47.5524695, longitude: -122.0425407}]
      }
    }
  
    displayMarkers = () => {
      return this.state.stores.map((store, index) => {
        return <Marker key={index} id={index} position={{
         lat: store.latitude,
         lng: store.longitude
       }}
       onClick={() => console.log("You clicked me!")} />
      })
    }
  
    render() {

      let currTrip = TripApiService.getTrip(this.props.tripID)
      return (
          <Map
            google={this.props.google}
            zoom={8}
            style={mapStyles}
            initialCenter={{ lat: currTrip.lat, lng: currTrip.long}}
          >
            {/* {this.displayMarkers()} */}
          </Map>
      );
    }
  }

  const mapStyles = {
    width: '80%',
    height: '80%',

  };

  export default GoogleApiWrapper({
    apiKey: 'AIzaSyAqwvGJ4-Cdmo1KHAY-a8_CQpzcNPVRqY0'
  })(MapContainer);

