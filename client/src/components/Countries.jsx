import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getActivities, getCountries, resetSearch } from '../store/actions';
import Country from './Country';
import './Countries.css';
import Paginate from './Paginate';


export default function Countries() {

    const countries = useSelector((state) => state.countries); //all countries, continents
    const search = useSelector((state) => state.search); //by name
    const filter = useSelector((state) => state.getFilter); //filters by orders, population, alphabet
    const filterStatus = useSelector((state) => state.filterStatus);
    const searchStatus = useSelector((state) => state.searchStatus);

    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);

    let totalCountries = 0;
    let countriesPerPage = 10;
    let initialPage = 9;
    let flagCounts = 0; 
    let indexOfLastCountry = 0;
    let indexOfFirstCountry = 0;

    if (filter.length > 0) {
        totalCountries = filter.length;
    } else if (search.length > 0) {
        totalCountries = search.length;
    } else if (countries.length > 0) {
        totalCountries = countries.length;
    }

    if (currentPage === 1) {
        indexOfLastCountry = (currentPage * initialPage);
        indexOfFirstCountry = indexOfLastCountry - initialPage;
    } else {
        flagCounts = countriesPerPage - initialPage; //1
        indexOfLastCountry = (currentPage * countriesPerPage) - flagCounts;
        indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    }

    //let indexOfLastCountry = (currentPage * countriesPerPage) - flagCounts; //iLC = 1 * 9(1st page), 20(2nd page)
    //let indexOfFirstCountry = indexOfLastCountry - countriesPerPage; 

    const filterCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);
    const filterSearch = search.slice(indexOfFirstCountry, indexOfLastCountry);
    const filterFilters = filter.slice(indexOfFirstCountry, indexOfLastCountry);

    useEffect(() => {
        dispatch(getCountries())
        dispatch(getActivities())
        return () => {
            dispatch(resetSearch())
        }
    }, [])
    
    return (
        <>
            <div>
                {totalCountries > countriesPerPage && (
                    <Paginate
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalCountries={totalCountries}
                        countriesPerPage={countriesPerPage}
                    />
                )}
            </div>
            <div className='container2'>
                {
                    search.length > 0 ? filterSearch.map((e) => {
                        const { id, name, capital, continent, image, subregion, area, population } = e
                        return (
                            <Country
                                id={id}
                                name={name}
                                capital={capital}
                                continent={continent}
                                image={image}
                                subregion={subregion}
                                area={area}
                                population={population}
                            />
                        )
                    })
                        : searchStatus === 'success' ? (<div className='countryNotExist'><p>Country does not exist</p><br></br><p>Please press reset to continue</p></div>) :

                            filter.length > 0 ? filterFilters.map((e) => {
                                const { id, name, capital, continent, image, subregion, area, population } = e
                                return (
                                    <Country
                                        id={id}
                                        name={name}
                                        capital={capital}
                                        continent={continent}
                                        image={image}
                                        subregion={subregion}
                                        area={area}
                                        population={population}
                                    />
                                )
                            })
                                : filterStatus === 'success' ? (<div className='ActivityNotExist'><p>Activities do not exist in this season</p><br></br><p>Please press reset to continue</p></div>) :
                                    filterCountries.map((e) => {
                                        const { id, name, capital, continent, image, subregion, area, population } = e
                                        return (
                                            <Country
                                                id={id}
                                                name={name}
                                                capital={capital}
                                                continent={continent}
                                                image={image}
                                                subregion={subregion}
                                                area={area}
                                                population={population}
                                            />
                                        )
                                    })
                }

            </div>
        </>
    )

}
