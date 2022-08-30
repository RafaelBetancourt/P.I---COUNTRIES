import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './NavBar.css';
import {
  getCountryByContinent,
  getCountryByName,
  resetSearch,
  getCountryByOrder,
  getCountryByPopulation,
  getCountryByActivities
} from '../store/actions';

export default function Navbar() {

  const [search, setSearch] = useState('');
  const [select, setSelect] = useState('');

  const onChange = (event) => {
    setSearch(event.target.value)
  }

  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(getCountryByName(search))
    setSearch('')
  }

  const onReset = () => {
    dispatch(resetSearch())
    setSelect('')
  }

  const onSelect = (event, filtro) => {
    setSelect(event.target.value);

    dispatch(filtro(event.target.value))
  }

  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== 'countries') {
      setSelect('')
      
    }
  }, [location])

  return (
    <>
      <div>
        <nav className='nav'>
          <div className='navSearchLine'>
            <div className='searchCreateLine'>
              <input onChange={onChange} value={search} type='search' placeholder='type a country' className='searchCountry'></input>
              <button onClick={onClick} className='btnSearch'>Search</button>
              <button onClick={onReset} className='btnReset'>Reset</button> {/* Ya no me sirve este boton */}
            </div>

            <div>
              <Link to={`/countries`} className='homeLink'>
                Home
              </Link>
            </div>
            <div>
              <Link to={`/countries/activities`} className='createLink'>
                Create Activity
              </Link>
            </div>
          </div>
          <div className='filterOptions'>
            <select className='continentSelector' onChange={(event) => onSelect(event, getCountryByContinent)} value={select}>
              <option hidden>Select by continent</option>
              <option value='africa'>Africa</option>
              <option value='americas'>Americas</option>
              <option value='asia'>Asia</option>
              <option value='europe'>Europe</option>
              <option value='oceania'>Oceania</option>
            </select>
            <select className='alphabetSelector' onChange={(event) => onSelect(event, getCountryByOrder)} value={select}>
              <option hidden>Select by alphabet</option>
              <option value='ASC'>A - Z</option>
              <option value='DESC'>Z - A</option>
            </select>
            <select className='populationSelector' onChange={(event) => onSelect(event, getCountryByPopulation)} value={select}>
              <option hidden>Select by population</option>
              <option value='MIN'>Min-Max</option>
              <option value='MAX'>Max-Min</option>
            </select>
            <select className='turisticSelector' onChange={(event) => onSelect(event, getCountryByActivities)} value={select}>
              <option hidden>Select by Acivity</option>
              <option value='Winter'>Winter</option>
              <option value='Summer'>Summer</option>
              <option value='Fall'>Fall</option>
              <option value='Spring'>Spring</option>

            </select>
            <button onClick={onReset} className='clearFilterButtons'>Clear filters</button>
          </div>
        </nav>
      </div>
      <Outlet />
    </>
  )
}

