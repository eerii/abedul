import React from "react";

const Notification = ({ error, message }) => {
    const notificationStyle = {
        color: 'white',
        background: 'green',
        fontSize: 16,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const errorStyle = {...notificationStyle, background: 'red'}

    if (!message) {
        return null
    }

    return (
        <div style={error ? errorStyle : notificationStyle}>
            {message}
        </div>
    )
}

export default Notification