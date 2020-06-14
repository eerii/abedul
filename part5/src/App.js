import React, {useState} from "react"
import BlogList from "./components/BlogList"
import Login from "./components/Login"

const App = () => {
    const [user, setUser] = useState(null)

    return (
        <div>
            {(user === null) ? <Login setUser={setUser}/> : <BlogList user={user}/>}
        </div>
    )
}

export default App