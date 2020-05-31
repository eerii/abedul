import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import axios from "axios"
import './index.css'

const Button = ({onClick, name}) => <button onClick={onClick}>{name}</button>

const ListDisplay = ({name, setSearchVal}) => {
    return (
        <>
            <p>{name} <Button name="View" onClick={event => setSearchVal(name)}/></p>
        </>
    )
}

const CountryDisplay = (props) => {
    const country = props.country
    return (
        <>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h3>Languages</h3>
            <ul>
                {country.languages.map(lan => <li key={lan.name}>{lan.name}</li>)}
            </ul>
            <img src={country.flag} alt="Flag" id="flag"></img>
        </>
    )
}

const Countries = ({countries, setSearchVal}) => {
    let list = ""
    if (countries.length > 10) {
        list = "There are too many countries that match your search, please provide further details"
    }
    else if (countries.length > 1) {
        list = countries.map(countries => <ListDisplay key={countries.name} name={countries.name} setSearchVal={setSearchVal}/>)
    }
    else if (countries.length === 1) {
        const [country] = countries
        list = <CountryDisplay country={country}/>
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
            <Countries countries={searchCountries} setSearchVal={setSearchVal}/>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));