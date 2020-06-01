import React, { useState, useEffect } from 'react'
import Form from './Form'
import Search from './Search'
import Book from './Book'
import contactService from '../services/contacts'

const App = () => {
    const [ contacts, setContacts ] = useState([])
    const [ searchVal, setSearchVal ] = useState('')

    useEffect(() => {
        console.log("Effect")
        contactService.getContact().then(contactlist => {
                console.log("Promise fulfilled")
                setContacts(contactlist)
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
            <Book contacts={contacts} setContacts={setContacts} search={searchVal}/>
        </div>
    )
}

export default App