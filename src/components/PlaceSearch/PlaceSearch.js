import React from 'react';
import { GoogleComponent } from 'react-google-location';
// import SEARCH_API_KEY from '../../config'
const SEARCH_API_KEY = 'AIzaSyDKPDbk7DXoycomaamRr6fatOE3xqJ6HJg';

export default class PlaceSearch extends React.Component {
  render() {
    //console.log(SEARCH_API_KEY);
    return (
      <div>
        <GoogleComponent
          apiKey={SEARCH_API_KEY}
          language={'en'}
          country={'country:in|country:us|country:it|country:de|country:jp'}
          coordinates={true}
          currentCoordinates={{
            lat: 41.7151377,
            lng: 44.827096,
          }}
          placeholder={'Start typing location'}
          //   locationBoxStyle={'custom-style'}
          //   locationListStyle={'custom-style-list'}
          onChange={(e) => {
            this.props.storePlace(e);
          }}
        />
      </div>
    );
  }
}
