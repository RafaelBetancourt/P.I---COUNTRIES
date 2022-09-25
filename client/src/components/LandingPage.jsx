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
        
          <h5>Bienvenidos a</h5>
          <h2>MI MUNDO APP</h2>
          <Link to='/countries' className="linkToHome">
            <p>Presiona <b>AQUI</b> para continuar</p>
          </Link>
        </div>
        
      </div>

    </div>
  )
}
