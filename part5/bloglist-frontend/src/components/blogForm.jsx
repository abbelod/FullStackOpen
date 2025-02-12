import { useState } from "react"

const BlogForm = ({addBlog})=>{


    const blogFormSubmit = (event)=>{
        event.preventDefault()

        const blogObject = {
            author, 
            title,
             url
        }

        addBlog(blogObject)
        setAuthor('')
        setTitle('')
        setUrl('')
    }

    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')

return (
<div>
    <h2>
        Create New
    </h2>

    <form onSubmit={blogFormSubmit}>
        title
        <input data-testid = 'title' type="text" value={title} onChange={({target})=> setTitle(target.value)} />
        <br />
        author
        <input data-testid = 'author' type="text" value={author} onChange={({target})=> setAuthor(target.value)} />
        <br />
        url
        <input data-testid = 'url' type="text" value={url} onChange={({target})=> setUrl(target.value)}/>

        <br />
        <button type='Submit'>create</button>
    </form>
</div>
)
}

export default BlogForm