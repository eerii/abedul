import Blog from "./Blog";
import React, {useEffect, useState} from "react";
import blogService from "../services/blogs";

const BlogList = ({user}) => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        blogService.getAll().then(blogs => setBlogs(blogs) )
    }, [])

    return (
        <div>
            <h2>Blogs</h2>
            <p>The user {user.name} is logged in.</p>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default BlogList