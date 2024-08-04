const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')


blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })
  


  blogsRouter.delete('/:id', (request,response)=>{
   Blog.findByIdAndDelete(request.params.id)
   .then(result=>{
    response.status(204).end()
   })
   .catch(error=>next(error))
  })


  blogsRouter.get('/:id', (request,response)=>{
    Blog.findById(request.params.id)
    .then(blog=>{
      console.log(request.params.id)
      console.log(blog)
      response.json(blog)
    })
  })

  module.exports = blogsRouter