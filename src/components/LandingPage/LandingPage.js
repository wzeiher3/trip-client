import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'
import Airplane from '../../assets/images/airplane.png'
import Background from '../../assets/images/ways-landscape.jpg'
export default class LandingPage extends Component {


    render() {
        return (
            <div className="landing-page-container">
                {/* <div className="circle-container">
                    <div className="circle">

                    </div>
                </div> */}
                <div className="background-image">
                    <img className="landing-page-background" src={Background} />
                </div>
                <div className="background">
                    <img src={Airplane} alt='airplane taking off' />
                    <div className="ways-header">
                        <p>Ways</p>
                    </div>
                </div>

                <section className="landing-page">
                    {/* <div className="ways-info">
                        <h2>Welcome!</h2>
                    </div> */}
                    <div className="wrapper">
                        <div className="one">
                            {/* <p>Here at Ways, our goal is assisting you in finding and planning the perfect getaway! From a simple night out to a journey across the world, Ways! is here.</p>
                            <p>Looking for some interesting places to visit? Just search for your target destination or activity! Are you a local looking to tell others the best attractions in your area? Add a trip and share that information with the world!</p>
                            <div className="linkToDashButton">
                            <Link to="/dashboard">
                            <div className="myButton">Continue to Ways!</div>
                        </Link> */}
                            {/* </div> */}
                            {/* <p>one</p> */}
                            <i class="fas fa-plane-departure xl fa-2x"></i>
                            <hr />
                            <p>Our goal is getting your vacay off the ground!</p>
                        </div>
                        <div className="two what-to-do">
                            <i class="fas fa-hotel fa-2x"></i>
                            <hr />
                            <p>Find places to visit, or add places you know to help others!</p>
                        </div>

                        <div className="three call-to-action">
                            <i class="fas fa-car fa-2x"></i>
                            <hr />
                            <p>Plan out every stop, or take a trip another user added!</p>
                        </div>
                    </div>
                    <div className="linkToDashButton">
                            <Link to="/dashboard">
                            <div className="myButton">Continue to Ways!</div>
                        </Link>
                    </div>
                </section>
            </div>
        )
    }
}