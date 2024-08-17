import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import axios from 'axios'







const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const[errorMessage, setErrorMessage] = useState('')
  const [notification, setNotification] = useState('')


  const loginForm = () => {

    return (

      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)} />

        </div>

        <div>
          password
          <input type="password"
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type='submit'>login</button>
      </form>
    )


  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      console.log(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      console.log('wrong credentials')
    }
    console.log('logging in with ', username, password)
  }

  const logOut = () => {
    console.log('logout button clicked')
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }

  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  if (user === null) {
    return (

      <div>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  const blogFormSubmit = async (event) => {
    event.preventDefault()

    const blog = {
      author,
      url,
      title
    }

    try{
      const response = await blogService.create(blog)
      console.log(response)
      blogService.getAll().then(blogs => {
        setBlogs(blogs)
      })
      setNotification(`a new blog ${blog.title} by  ${blog.author} added`)
      setTimeout(()=>{
        setNotification('')
      }, 5000)
    } catch(exception){
      setErrorMessage('Error Adding a new Blog')
      setTimeout(()=>{
        setErrorMessage('')
      }, 5000)
    }

  }


  return (
    <div>
      {errorMessage}
      {notification}
      <h2>blogs</h2>
      <div>
        <p>{user.name} logged in
          <button onClick={logOut}>logout</button>
        </p>
      </div>

      <div>
        <h2>
          Create New
        </h2>

        <form onSubmit={blogFormSubmit}>
          title
          <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
          <br />
          author
          <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} />
          <br />
          url
          <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} />

          <br />
          <button type='Submit'>create</button>
        </form>
      </div>

      {blogs.map(blog => {
        return <Blog key={blog.id} blog={blog} />
      }
      )}
    </div>
  )
}

export default App