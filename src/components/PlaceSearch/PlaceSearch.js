import React from 'react';
import { GoogleComponent } from 'react-google-location';

const SEARCH_API_KEY = 'AIzaSyDKPDbk7DXoycomaamRr6fatOE3xqJ6HJg';

export default class PlaceSearch extends React.Component {
  render() {
    return (
      <div
        onBlur={() => {
          this.props.resetPlace();
        }}
      >
        <GoogleComponent
          apiKey={SEARCH_API_KEY}
          language={'en'}
          // country={'country:in|country:us'}
          country={`country:${this.props.countryCode}`}
          coordinates={true}
          currentCoordinates={{
            lat: 41.7151377,
            lng: 44.827096,
          }}
          placeholder={'Start typing location...(May take a few seconds)'}
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
