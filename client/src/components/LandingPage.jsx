import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'

export default function LandingPage() {
  return (
    <div className='toCountries'>
        <h2>Country App</h2>
        <Link to='/countries' className="linkToHome">
        Click here to begin!!
        </Link>
    </div>
  )
}
