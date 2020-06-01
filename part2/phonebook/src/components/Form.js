import React, {useState} from 'react'
import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const Form = ({contacts, setContacts}) => {
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

            axios
                .post(baseUrl, contactObj)
                .then(response => {
                    setContacts(contacts.concat(response.data))
                })
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
    )
}

export default Form