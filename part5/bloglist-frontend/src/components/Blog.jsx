import { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({blog, updateBlog, username, deleteBlog}) => {

  // console.log(blog)
console.log('username', username)
// if(blog.user){
  
//   console.log('blog author: ', blog.user.username)
// }
// console.log('blog is',blog)


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const [show, setShow] = useState(false)

  const toggleShow = (id) => {

    if(blog.user){

      if(blog.user.username){
        
        console.log('blog author: ', blog.user.username)
      }
}
    console.log('button clicked for', id)
    setShow(!show)
  }


  if (show) {


    return (
      <div style={blogStyle}>
        <ul>
          <li>Title: {blog.title}</li>
          <li>Author: {blog.author}</li>
          <li>Likes: {blog.likes} <button onClick={()=> updateBlog(blog)}>like</button></li>
          <li>Url: {blog.url}</li>
          {username != '' && blog.user && blog.user.username && username === blog.user.username && <button onClick={()=> deleteBlog(blog)}>remove</button>}
          
        </ul>
        <button onClick={() => toggleShow(blog.id)}>hide</button>
      </div>
    )

  }
  else {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={() => toggleShow(blog.id)}>show</button>
      </div>
    )

  }

}

export default Blog