import React, { useState } from 'react'

const Display = ({name}) => <p>{name}</p>

const Book = ({contacts}) => {
    return (
        <div>
            {contacts.map(contacts => <Display key={contacts.name} name={contacts.name}/>)}
        </div>
    )
}

const App = () => {
    const [ contacts, setContacts ] = useState([
        { name: 'Arto Hellas' }
    ])
    const [ newName, setNewName ] = useState('')

    const addNote = (event) => {
        event.preventDefault()
        const contactObj = {
            name: newName
        }
        setContacts(contacts.concat(contactObj))
        setNewName('')
        //console.log('button clicked', event.target)
    }

    const onNameChange = (event) => {
        setNewName(event.target.value)
        //console.log(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addNote}>
                <div>
                    Name: <input value={newName} onChange={onNameChange}/>
                </div>
                <div>
                    <button type="submit">Add Contact</button>
                </div>
            </form>
            <h2>Contacts</h2>
            <Book  contacts={contacts}/>
        </div>
    )
}

export default App