'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';

export default class Dashboard extends React.Component{
    state = {
        error: null,
    }
}   


render(){
    return (
        <section className="Dashboard">
            <div className="upperSection">
                 <div className="addTripButton">
                    
                 </div> 
                 <div className="titleDiv">

                 </div>
                 <div className="myTripButton">

                 </div>
            </div> 
            <div className="lowerSection">
                
            </div>
        </section>
    )
}