import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import axios from "axios"
import './index.css'

const Button = ({onClick, name}) => <button onClick={onClick}>{name}</button>

const ListDisplay = ({name, setSearchVal}) => {
    return (
        <div>
            <p>{name} <Button name="View" onClick={event => setSearchVal(name)}/></p>
        </div>
    )
}

const Weather = ({api, capital}) => {
    const [ display, setDisplay ] = useState(<p>There is no weather data available at the moment</p>)

    useEffect(() => {
        console.log("Loading weather")
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api}&query=${capital}&units=m`)
            .then(response => {
                console.log("Weather loaded")
                setDisplay(
                    <div>
                        <h3>Weather in {capital}</h3>
                        <p>Temperature: {response.data.current.temperature}</p>
                        <img src={response.data.current.weather_icons} alt="Flag" id="weather_icons"></img>
                        <p>Wind: {response.data.current.wind_speed} m/s ({response.data.current.wind_dir}) </p>
                    </div>
                )
            })
    }, [])

    return(display)
}

const CountryDisplay = (props) => {
    const country = props.country

    return (
        <div>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>

            <h3>Languages</h3>
            <ul>
                {country.languages.map(lan => <li key={lan.name}>{lan.name}</li>)}
            </ul>
            <img src={country.flag} alt="Flag" id="flag"></img>

            <Weather capital={country.capital} api={props.api}/>
        </div>
    )
}

const Countries = ({countries, setSearchVal, api}) => {
    let list = ""
    if (countries.length > 10) {
        list = "There are too many countries that match your search, please provide further details"
    }
    else if (countries.length > 1) {
        list = countries.map(countries => <ListDisplay key={countries.name} name={countries.name} setSearchVal={setSearchVal}/>)
    }
    else if (countries.length === 1) {
        const [country] = countries
        list = <CountryDisplay country={country} api={api}/>
    }

    return (
        <div>
            {list}
        </div>
    )
}

const App = () => {
    const [ countries, setCountries ] = useState([])
    const [ searchVal, setSearchVal ] = useState('')

    const api_key = process.env.REACT_APP_API_KEY

    const searchCountries = countries.filter(countries => countries.name.toLowerCase().includes(searchVal.toLowerCase()))

    useEffect(() => {
        console.log("Loading countries")
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log("Promise fulfilled")
                setCountries(response.data)
            })
    }, [])

    return(
        <div>
            <h1>Country Data</h1>
            Search: <input value={searchVal} onChange={event => setSearchVal(event.target.value)}/>
            <Countries countries={searchCountries} setSearchVal={setSearchVal} api={api_key}/>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));