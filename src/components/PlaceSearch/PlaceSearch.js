import React from 'react';
import { GoogleComponent } from 'react-google-location';
const API_KEY = 'AIzaSyAqwvGJ4-Cdmo1KHAY-a8_CQpzcNPVRqY0';

export default class PlaceSearch extends React.Component {
  
      render() {

            return (
           
          <div >
             <GoogleComponent
             
              apiKey={API_KEY}
              language={'en'}
              country={'country:in|country:us'}
              coordinates={true}
              currentCoordinates={{
                "lat": 41.7151377,
                "lng": 44.827096
              }}
              placeholder={'Start typing location'}
            //   locationBoxStyle={'custom-style'}
            //   locationListStyle={'custom-style-list'}
              onChange={(e) => { this.props.storePlace(e)}} />
          </div>
        
    
        )
      } 
}