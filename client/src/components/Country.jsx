import React, { useEffect, useState } from 'react';
import './Country.css';
import { Link } from 'react-router-dom';


function Country(props) {

    return (
        <div key={props.id} className='out'>

            <Link to={`/countries/${props.id}`}>
                <img src={props.image} style={{ width: '300px', height: '200px' }} className='flaggy' />
            </Link>
            <h1>{props.name}</h1>
            <h1>From: <span>{props.continent}</span></h1>

        </div>
    )
}

export default Country

