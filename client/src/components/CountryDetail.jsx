import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCountryDetail } from '../store/actions';
import { useParams } from 'react-router-dom';
import './CountryDetail.css';


export default function CountryDetail() {

  const { idDetail } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector(state => state.countryDetail)

  useEffect(() => {
    dispatch(getCountryDetail(idDetail))
  }, [])

  return (
    <div className='countryDetailContainer'>
      <div className='countryDetails'>
        <label className='countryDetailsLabel'>Country details:</label>
        <h5>Name: {detail.name}</h5>
        <h5>Capital: {detail.capital}</h5>
        <h5>Continent: {detail.continent}</h5>
        <h5>Subregion: {detail.subregion}</h5>
        <h5>Area: {detail.area} Km<sup>2</sup></h5>
        <h5>Population: {detail.population} residents</h5>
        <img src={detail.image} widht="200px" height="150px" alt='country img' />
      </div>
      <div className='countryActivitySquare'>
        <label className='countryActivityLabel'>Country Activities</label>
        <table className='ActivityDescription'>
          <tr className='trBoxDetail'>
            <th>Activity</th>
            <th>Difficulty</th>
            <th>Duration</th>
            <th>Season</th>
          </tr>
          {detail.activities?.map(a => (
            <tr className='detailDescription'>
              <td>{a.name}</td>
              <td className='tdDifficDetail'>{a.difficulty}</td>
              <td className='tdDuratDetail'>{a.duration + 'h'}</td>
              <td className='tdSeasDetail'>{a.season}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  )
}

