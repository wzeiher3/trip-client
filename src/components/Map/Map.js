import React from 'react';
import { GoogleComponent } from 'react-google-location';
const API_KEY = 'AIzaSyDRG5I6GN2DQPl5SpTyNP6-LbQjHdDQzeY';

class Map extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            place: null,
        };
    }

    render(){
        console.warn("result return here", this.state.place)
        return (
            <div>
                    <GoogleComponent 
                        apiKey={API_KEY}
                        language={'en'}
                        country={'country:in|country:us'}
                        coordinates={true}
                        // locationBoxStyle={'custom-style'}
                        // locationListStyle={'custom-style-list'}
                        onChange={(e) => {this.setState({place: e})}}
                    />
            </div>
        )
    }
}