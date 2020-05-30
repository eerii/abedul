import React, { useState } from 'react'

const Display = ({name, number}) => <p>{name}: {number}</p>

const Book = ({contacts}) => {
    return (
        <div>
            {contacts.map(contacts => <Display key={contacts.name} name={contacts.name} number={contacts.number}/>)}
        </div>
    )
}

const App = () => {
    const [ contacts, setContacts ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    const addNote = (event) => {
        event.preventDefault()
        if ((contacts.map(contacts => contacts.name)).includes(newName)) {
            window.alert(`Your phonebook already includes ${newName}`);
        }
        else {
            const contactObj = {
                name: newName,
                number: newNumber
            }
            setContacts(contacts.concat(contactObj))
        }
        setNewName('')
        setNewNumber('')
    }

    const onNameChange = (event) => {
        setNewName(event.target.value)
    }

    const onNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addNote}>
                <div>
                    Name: <input value={newName} onChange={onNameChange}/>
                </div>
                <div>
                    Phone Number: <input value={newNumber} onChange={onNumberChange}/>
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