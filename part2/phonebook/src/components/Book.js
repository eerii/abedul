import React from "react";

const Display = ({name, number}) => <p>{name}: {number}</p>

const Book = ({contacts, search}) => {
    const searchContacts = contacts.filter(contacts => contacts.name.toLowerCase().includes(search.toLowerCase()))
    return (
        <div>
            {searchContacts.map(searchContacts => <Display key={searchContacts.name} name={searchContacts.name} number={searchContacts.number}/>)}
        </div>
    )
}

export default Book