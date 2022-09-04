import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import planetEarth from '../assets/planetEarth.mp4'

export default function LandingPage() {
  return (
    
    <div className='toCountries'>
      <div className='earthCont'>
        <video src={planetEarth} autoPlay loop muted alt='planet earth video' />
        <div className='landingTitles'>
          <h5>Welcome to</h5>
          <h2>MY WORLD APP</h2>
          <Link to='/countries' className="linkToHome">
            <p>Click <b>HERE</b> to continue</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
