import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'
import Airplane from '../../assets/images/airplane.png'

export default class LandingPage extends Component {


    render() {
        return (
            <div className="landing-page-container">
                <div className="background">
                    <img src={Airplane} alt='airplane taking off' />
                    <div className="ways-header">
                        <p>Ways!</p>
                    </div>
                </div>

                <section className="landing-page">
                    <div className="ways-info">
                        <h2>Welcome to Ways!</h2>
                    </div>
                    <div className="about-ways">

                            <p>Here at Ways, our goal is to assist you in finding/planning the perfect getaway! Whether it be a night out, or journey across the world, there's no end to the places you can visit. Looking for some interesting places to visit? Just search for your target destination or activity! Are you a local that wants to let others know all the niche and boujee restaurants and parks in your area? Add a trip and share that information with the world!</p>
                            <p>Ways is designed to give users a place both find and plan an amazing trip!</p>
                            <div className="linkToDashButton">
                                <Link to="/dashboard">
                                    <div className="myButton">Continue to Ways!</div>
                                </Link>
                            </div>
                        </div>
                </section>
            </div>
        )
    }
}