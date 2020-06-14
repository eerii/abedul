import React, {useEffect, useState} from "react"
import BlogList from "./components/BlogList"
import Login from "./components/Login"

const App = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const loggedInUser = window.localStorage.getItem("loggedBloglistUser")

        if (loggedInUser) {
            const user = JSON.parse(loggedInUser)
            setUser(user)
        }
    }, [])

    return (
        <div>
            {(user === null) ? <Login setUser={setUser}/> : <BlogList user={user}/>}
        </div>
    )
}

export default App