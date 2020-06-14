import React, {useState} from "react"
import login from "../services/login"
import blogService from "../services/blogs"

const Login = ({setUser, setNotification, timeout, setTheTimeout}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (event) => {
        event.preventDefault()
        //console.log(`The user ${username} is login with ${password}`)

        try {
            const user = await login.login({ username, password })
            window.localStorage.setItem( "loggedBloglistUser", JSON.stringify(user) )
            setUser(user)
            blogService.setToken(user.token)

            setNotification([false, `${user.name}, you have logged in successfully`])
            if (timeout) {clearTimeout(timeout)}
        } catch (exception) {
            setNotification([true, `Wrong credentials, please try again`])
            if (timeout) {clearTimeout(timeout)}
        }

        setUsername("")
        setPassword("")
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    Username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    Password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login