import React, { useState } from 'react'
import Form from './Form'
import Search from './Search'
import Book from './Book'

const App = () => {
    const [ contacts, setContacts ] = useState([])
    const [ searchVal, setSearchVal ] = useState('')

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