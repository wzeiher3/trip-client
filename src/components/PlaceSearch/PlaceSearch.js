import React from 'react';
import { GoogleComponent } from './GoogleComponent';

const SEARCH_API_KEY = 'AIzaSyAF0LCbqpdlaVROEeXSC9rxW8blwyF5Reg';

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
          country={`country:${this.props.countryCode}`}
          coordinates={true}
          currentCoordinates={{
            lat: 41.7151377,
            lng: 44.827096,
          }}
          placeholder={'Start typing location...(May take a few seconds)'}
          onChange={(e) => {
            this.props.storePlace(e);
          }}
        />
      </div>
    );
  }
}
