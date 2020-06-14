import React, {useEffect, useState} from "react";
import blogService from "../services/blogs";

const LogOutButton = () => {
    const logOut = () => {
        window.localStorage.removeItem("loggedBloglistUser")
        blogService.setToken("")
        window.location.reload()
    }

    return (
        <button onClick={logOut}>Log Out</button>
    )
}

const Blog = ({ blog }) => (
    <div>
        {blog.title} {blog.author}
    </div>
)

const AddBlog = ({user, blogs, setBlogs, setNotification, timeout}) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const handleNewBlog = async (event) => {
        event.preventDefault()

        try {
            const blog = await blogService.newBlog({title, author, url})
            setBlogs(blogs.concat(blog))

            setNotification([false, `The blog ${blog.title} by ${blog.author} has been created`])
            if (timeout) {clearTimeout(timeout)}
        } catch (exception) {
            console.log(exception)
            setNotification([true, `There was an error creating the blog ${title}`])
            if (timeout) {clearTimeout(timeout)}
        }

        setTitle("")
        setAuthor("")
        setUrl("")
    }

    return (<div>
        <h4>Add new blog</h4>
        <form onSubmit={handleNewBlog}>
            <div>
                Title:
                <input
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                Author:
                <input
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                URL:
                <input
                    type="text"
                    value={url}
                    name="Url"
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit">Add Blog</button>
        </form>
    </div>)
}

const BlogList = ({user, setNotification, timeout}) => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        blogService.getAll().then(blogs => setBlogs(blogs) )
    }, [])

    return (
        <div>
            <h2>Blogs</h2>
            <p>The user {user.name} is logged in.<LogOutButton/></p>

            <AddBlog user={user} blogs={blogs} setBlogs={setBlogs} setNotification={setNotification} timeout={timeout}/>

            <h4>Blog list</h4>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default BlogList