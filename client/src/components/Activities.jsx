import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, postActivity, getActivities } from '../store/actions';
import './Activities.css';

export default function Activity(props) {

  const countries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.getActivities);

  const initialValues = {
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    country: [],
  }

  let [error, setError] = useState({
    country: '',
    errorDesc: ''
  });

  let [input, setInput] = useState(initialValues);

  const dispatch = useDispatch();

  const postActivities = function (e) { //<--- create the activity

    e.preventDefault()
    //console.log(input);
    const onlyLetters = /[^a-zA-Z\s]/g; //<---- Validation
    if (input.name.length < 4) {
      return alert('The activity must contain at least 4 letters')
    } else if (input.name.length > 40) {
      return alert('The activity must contain less than 40 characters')
    }
    if (!input.name.trim()) {
      return alert('The activity must contain characters')
    }
    if (!onlyLetters.test(input.name)) {

      dispatch(postActivity(input));
      setInput(initialValues);
      alert("Activity created succesfully!")
      dispatch(getActivities())
    } else {
      return alert("Only letters allowed in the activity name!");
      //setInput(initialValues);
    }
  };


  useEffect(() => {   //<-- allows me to make secondary effects (activities, countries)
    if (countries.length === 0) { //verify if it has something, if so, don't re-render
      dispatch(getCountries())
    }
    if (activities.length === 0) {
      dispatch(getActivities())
    }
  }, [dispatch, countries])


  const handleInputChange = function (e) {  //hanlde the chance to control things

    if (e.target.name === 'country') {
      if (input.country.length == 5) {
        setError({
          ...error,
          country: 'only 5 countries allowed'
        })
      } else {
        setInput({
          ...input,
          country: input.country.concat(e.target.value) // Sintaxis ES6 para actualizar la key correspondiente
        });
      }
    } else if (input.name.length > 40 && e.target.value.length > 40) {
      setError({
        ...error,
        errorDesc: 'only 40 characters allowed'
      })
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
      setError({
        ...error,
        errorDesc: ''
      });
    }
  }

  const clear = function () {
    setInput(initialValues);
  }

  const validate = function () { //<-- button validation

    if (input.name.length > 40 ||
      input.name === initialValues.name ||
      input.duration === initialValues.duration ||
      input.difficulty === initialValues.difficulty ||
      input.season === initialValues.season ||
      input.country === initialValues.country) {
      return true
    } else {
      return false
    }
  }

  return (
    <div className='activityContainer'>
      <form className='formsquare' onSubmit={postActivities} onReset={clear}>
        <div className='formDiv'>
          <label className='labelActivity'>Register the activity data</label>

          <select className='selectCountry' value='Select a country' name='country' onChange={handleInputChange}>
            <option hidden>Select a country</option>
            {countries?.filter(e => !input.country.includes(e.id)).map(e => (
              <option value={e.id}>{e.name}</option>
            ))}
          </select>

          <label className='numCountriesCondition'>{error.country.length > 0 && error.country}</label>
          <label className='selectedCountries'>{input.country.join(' ')}</label>

          <input placeholder='Type an activity' value={input.name} className='inputActivity' name='name' onChange={handleInputChange} />
          <label className='numCharactersCondition'>{error.errorDesc.length > 0 && error.errorDesc}</label>

          <select className='selectDifficulty' value={input.difficulty} name='difficulty' onChange={handleInputChange}>
            <option hidden>Select a difficulty</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
          <select className='selectHours' value={input.duration} name='duration' onChange={handleInputChange}>
            <option hidden>Select duration in hours</option>
            <option value='1'>1 Hour</option>
            <option value='2'>2 Hours</option>
            <option value='3'>3 Hours</option>
            <option value='4'>4 Hours</option>
            <option value='5'>5 Hours</option>
          </select>
          <select className='selectSeason' value={input.season} name='season' onChange={handleInputChange}>
            <option hidden>Select a season</option>
            <option value='Winter'>Winter</option>
            <option value='Summer'>Summer</option>
            <option value='Fall'>Fall</option>
            <option value='Spring'>Spring</option>
          </select>
          <button type='submit' className='saveButton' disabled={validate()}>Save</button>
          <button type='reset' className='clearButton' >Clear</button>
        </div>
      </form>

      <div className='createdSquare'>
        <label className='labelCreated'>Activities Created</label>

        <table className='ActivityDescription'>
          <tr className='trBox'>
            <th>activity</th>
            <th>difficulty</th>
            <th>duration</th>
            <th>season</th>
            <th>countries</th>

          </tr>
          {activities.map(a => (
            <tr className='detailDescription'>
              <td>{a.name}</td>
              <td className='tdDiffic'>{a.difficulty}</td>
              <td className='tdDurat'>{a.duration + 'h'}</td>
              <td className='tdSeas'>{a.season}</td>
              <td className='tdCount'>{a.countries.map(e => ' | ' + e.id + ' | ')}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  )
};