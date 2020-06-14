import React, {useEffect, useState} from "react"
import BlogList from "./components/BlogList"
import Login from "./components/Login"
import Notification from "./components/Notification";
import blogService from "./services/blogs";

const App = () => {
    const [ user, setUser ] = useState(null)
    const [ notification, setNotification ] = useState([false, ""])
    const [ timeout, setTheTimeout ] = useState(null)

    useEffect(() => {
        const loggedInUser = window.localStorage.getItem("loggedBloglistUser")

        if (loggedInUser) {
            const user = JSON.parse(loggedInUser)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    useEffect(() => {
        setTheTimeout(setTimeout(() => {
            setNotification([false, ""])
        }, 3000))
    }, [notification])

    return (
        <div>
            <Notification error={notification[0]} message={notification[1]}/>
            {(user === null) ?
                <Login setUser={setUser} setNotification={setNotification} timeout={timeout}/> :
                <BlogList user={user} setNotification={setNotification} timeout={timeout}/>}
        </div>
    )
}

export default App