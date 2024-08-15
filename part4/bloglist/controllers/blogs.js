const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')


// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }

//   return null
// }

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)

})

blogsRouter.post('/', middleware.userExtractor, async(request, response, next) => {

  const body = request.body

  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // if(!decodedToken.id){
  //   return response.status(401).json({error: 'token invalid'})
  // }

  // const user = await User.findById(decodedToken.id)

  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url : body.url,
    likes: body.likes,
    user: user.id
  })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)

    console.log(savedBlog._id)
    console.log(user)
    await user.save()

    response.status(201).json(savedBlog)

})

// blogsRouter.post('/', async (request, response, next) => {

//   const body = request.body

//   const user = await User.findOne()

//   console.log('use is: ',user)

//   const blog = new Blog({
//     title: body.title,
//     author: body.author,
//     url: body.url,
//     likes: body.likes,
//     user: user.id
//   })

//   const savedBlog = await blog.save()
//   user.blogs = user.blogs.concat(savedBlog._id)

//   await user.save()

//   response.status(201).json(savedBlog)

// })



// blogsRouter.delete('/:id', async (request, response, next) => {

//   await Blog.findByIdAndDelete(request.params.id)
 
//   response.status(204).end()

// })


blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {

  const blog = await Blog.findById(request.params.id)

  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // if(!decodedToken.id){
  //   return response.status(401).json({error: 'token invalid'})
  // }

  // if(blog.user.toString()=== decodedToken.id.toString()){
  //   await Blog.findByIdAndDelete(request.params.id)
  // } else{
  //   response.status(403).json({error: 'user lacks the permission'}).end()
  // }
  
  const user = request.user

  if(blog.user.toString() === user.id.toString()){
    await Blog.findByIdAndDelete(request.params.id)
  } else{
    response.status(403).json({error: 'user lacks the permission'}).end()
  }

  response.status(204).end()

})



blogsRouter.get('/:id', async (request, response, next) => {

  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)

  } else {
    response.status(404).end()
  }


  // Blog.findById(request.params.id)
  // .then(blog=>{
  //   console.log(request.params.id)
  //   console.log(blog)
  //   response.json(blog)
  // })
})

blogsRouter.put('/:id', async (request, response, next) => {

  const body = request.body
  const blog = {
    author: body.author,
    url: body.url,
    likes: body.likes,
    title: body.url,
  }


  await Blog.findByIdAndUpdate(request.params.id, blog)
  response.status(200).json(blog)


})

module.exports = blogsRouter