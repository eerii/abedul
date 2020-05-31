import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './Form'
import Search from './Search'
import Book from './Book'

const App = () => {
    const [ contacts, setContacts ] = useState([])
    const [ searchVal, setSearchVal ] = useState('')

    useEffect(() => {
        console.log("Effect")
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log("Promise fulfilled")
                setContacts(response.data)
            })
    }, [])
    console.log("Render", contacts.length, "contacts")

    return (
        <div>
            <h1>Phonebook</h1>

            <h3>Add New</h3>
            <Form contacts={contacts} setContacts={setContacts}/>

            <h3>Contacts</h3>
            <Search searchVal={searchVal} setSearchVal={setSearchVal}/>
            <Book contacts={contacts} search={searchVal}/>
        </div>
    )
}

export default App