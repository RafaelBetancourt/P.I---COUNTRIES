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
    // if (!(/^[a-zA-Z]$/.test(input.name))) {
    //   return alert('Activity description must contain only letters')
    // }

    if (!onlyLetters.test(input.name)) {
      const names = activities.map(el => el.name.toUpperCase());
      if (!names.includes(input.name.toUpperCase())) {

        dispatch(postActivity(input));
        setInput(initialValues);
        alert("Activity created succesfully!")
        dispatch(getActivities())
      } else {
        alert('Activity already created')
      }
    } else {
      return alert("Only letters allowed in the activity name!");
    }
  };
  // const conditions = function () {     separar las condiciones para manejar mejor los errores en la funcion handleInputChange
  // }
  useEffect(() => {
    if (countries.length === 0) {
      dispatch(getCountries())
    }
    if (activities.length === 0) {
      dispatch(getActivities())
    }
  }, [dispatch, countries])

  const handleInputChange = function (e) {  //hanlde the change to control things
    if (e.target.name === 'country') {
      if (input.country.length === 5) {
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
          <label className='labelActivity'>Registra los datos de la actividad</label>

          <select className='selectCountry' value='Select a country' name='country' onChange={handleInputChange}>
            <option hidden>Selecciona un país</option>
            {countries?.filter(e => !input.country.includes(e.id)).map(e => (
              <option value={e.id}>{e.name}</option>
            ))}
          </select>

          <label className='numCountriesCondition'>{error.country.length > 0 && error.country}</label>
          <label className='selectedCountries'>{input.country.join(' ')}</label>

          <input placeholder='Type an activity' value={input.name} className='inputActivity' name='name' onChange={handleInputChange} />
          <label className='numCharactersCondition'>{error.errorDesc.length > 0 && error.errorDesc}</label>

          <select className='selectDifficulty' value={input.difficulty} name='difficulty' onChange={handleInputChange}>
            <option hidden >Selecciona una dificultad</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
          <select className='selectHours' value={input.duration} name='duration' onChange={handleInputChange}>
            <option hidden>Selecciona la duración en horas</option>
            <option value='1'>1 Hora</option>
            <option value='2'>2 Horas</option>
            <option value='3'>3 Horas</option>
            <option value='4'>4 Horas</option>
            <option value='5'>5 Horas</option>
          </select>
          <select className='selectSeason' value={input.season} name='season' onChange={handleInputChange}>
            <option hidden>Selecciona una temporada</option>
            <option value='Winter'>Invierno</option>
            <option value='Summer'>Verano</option>
            <option value='Fall'>Otoño</option>
            <option value='Spring'>Primavera</option>
          </select>
          <button type='submit' className='saveButton' disabled={validate()}>Save</button>
          <button type='reset' className='clearButton' >Limpiar</button>
        </div>
      </form>

      <div className='createdSquare'>
        <label className='labelCreated'>Actividades Creadas</label>

        <table className='ActivityDescription'>
          <tr className='trBox'>
            <th>Actividad</th>
            <th>Dificultad</th>
            <th>Duración</th>
            <th>Temporada</th>
            <th>Paises</th>
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