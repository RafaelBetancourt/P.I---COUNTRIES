import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import planetEarth from '../assets/planetEarth.mp4';


export default function LandingPage() {

  return (

    <div className='toCountries'>
      <div className='earthCont'>
        <video src={planetEarth} autoPlay loop muted alt='planet earth video' />
        <div className='landingTitles'>
          <h3>Do you like traveling?</h3>
          <h2>WELCOME TO MY WORLD APP</h2>
          <Link to='/countries' className="linkToHome">
            <button className='buttonLanding'><span>Pres <b>HERE</b> to continue</span></button>
          </Link>
        </div>
      </div>
    </div>
  )
};
