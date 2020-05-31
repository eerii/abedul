import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

const Display = ({name}) => <p>{name}</p>

const CountryDisplay = (props) => {
    const country = props.props
    return (
        <>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h3>Languages</h3>
            <ul>
                {country.languages.map(lan => <li key={lan.name}>{lan.name}</li>)}
            </ul>
            <img src={country.flag} alt={"Flag"}></img>
        </>
    )
}

const Countries = ({countries}) => {
    let list = ""
    if (countries.length > 10) {
        list = "There are too many countries that match your search, please provide further details"
    }
    else if (countries.length > 1) {
        list = countries.map(countries => <Display key={countries.name} name={countries.name}/>)
    }
    else if (countries.length === 1) {
        const [country] = countries
        list = <CountryDisplay props={country}/>
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
            <Countries countries={searchCountries}/>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));