import React from "react";
import contactService from '../services/contacts'

const Button = ({name, id, contacts, setContacts, contactName}) => {

    const deleteThis = (event) => {
        if (window.confirm(`Do you really want to delete ${contactName}?`)) {
            contactService.deleteContact(id)
                .then(setContacts(contacts.filter(c => c.id !== id)))
                .catch(error => console.log("Error deleting contact"))
        }
    }

    return (
        <button onClick={event => deleteThis(event)}>{name}</button>
    )
}

const Display = ({name, number}) => {
    return (
        <p>{name}: {number}</p>
    )
}

const Book = ({contacts, setContacts, search}) => {
    const searchContacts = contacts.filter(contacts => contacts.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <div>
            {searchContacts.map(searchContacts =>
                <div key={searchContacts.id}>
                    <Display name={searchContacts.name} number={searchContacts.number}/>
                    <Button name="Delete" id={searchContacts.id} contacts={contacts} setContacts={setContacts} contactName={searchContacts.name}/>
                </div>)}
        </div>
    )
}

export default Book