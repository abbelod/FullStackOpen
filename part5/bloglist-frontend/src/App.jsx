import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
import BlogForm from './components/blogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [notification, setNotification] = useState('')

  const blogFormRef = useRef()



  const loginUser = async ({ username, password}) => {

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      console.log(user)

    } catch (exception) {
      console.log('wrong credentials')
    }
    console.log('logging in with ', username, password)
  }

  const logOut = () => {
    console.log('logout button clicked')
    window.localStorage.removeItem('loggedInUser')
    blogService.setToken('')
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


  
  

  const sortAndSet = (blogs)=>{
    blogs.sort((a,b)=>{
        if(a.likes> b.likes){
          return -1
        } else{
          return 1
        }
    })
    setBlogs(blogs)
  }


  useEffect( ()=> {

    // const getBlogs = async ()=>{
    //   const retVal =  await blogService.getAll()
    //   return retVal
    // }

    // const blogs = getBlogs()
    // console.log(blogs)

    blogService.getAll().then(blogs =>

      sortAndSet(blogs)
    )
  }, [])

  const deleteBlog = async(blog)=>{

    if(window.confirm(`Do you really want to delete ${ blog.title } by ${ blog.author }?`)){
      try{
        const response = await blogService.deleteBlog(blog.id)
        console.log(response)
        setNotification(`Blog Titled: ${ blog.title } Deleted`)
        setTimeout(() => {
          setNotification('')
        }, 5000)

        blogService.getAll().then(blogs => {
          sortAndSet(blogs)
        })
      } catch(exception){
  
        setErrorMessage('Error Deleting Blog')
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
      
      }

    }
  }

  const updateBlog = async (blog) => {
    try{

      const newBlog = {
        user: blog.user.id,
        likes: blog.likes+1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }
      const response = await blogService.update(newBlog, blog.id)
      console.log(response)
      blogService.getAll().then(blogs => {
        sortAndSet(blogs)
      })
      
      
    } catch(exception){
      setErrorMessage('Error Adding Updating a Blog')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  

  const addBlog = async (blog) => {

    blogFormRef.current.toggleVisibility()
    try {
      const response = await blogService.create(blog)
      console.log(response)
      blogService.getAll().then(blogs => {
          sortAndSet(blogs)
      })
      setNotification(`a new blog ${ blog.title } by  ${ blog.author } added`)
      setTimeout(() => {
        setNotification('')
      }, 5000)
    } catch (exception) {
      setErrorMessage('Error Adding a new Blog')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }

  }


  if (user === null) {
    return (

      <div>
        <h2>Log in to application</h2>
        <Togglable buttonLabel='login'>
          <LoginForm
            loginUser={ loginUser }
          ></LoginForm>

        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      { errorMessage }
      { notification }

      <div>
        <p>{ user.name } logged in
          <button onClick={ logOut }>logout</button>
        </p>
      </div>

      <Togglable buttonLabel='create new blog' ref={ blogFormRef }>

        <BlogForm

          addBlog={ addBlog }

        ></BlogForm>

      </Togglable>

      <Togglable buttonLabel='show blogs'>
        {blogs.map(blog => {
          return <Blog  key={ blog.id } blog={ blog } updateBlog = { updateBlog } deleteBlog= { deleteBlog } username={ user.username }></Blog>
        }
        )}


      </Togglable>

    </div>
  )
}

export default App