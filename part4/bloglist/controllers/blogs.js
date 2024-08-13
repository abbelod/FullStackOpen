const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')


blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
  response.json(blogs)
  
  })
  
  blogsRouter.post('/', async(request, response, next) => {
    // const blog = new Blog(request.body)

    // await blog.save()
    // response.status(201).json(result)

    const blog = new Blog(request.body)

      const savedBlog = await blog.save()
      response.status(201).json(savedBlog)
  
    // blog
    //   .save()
    //   .then(result => {
    //     response.status(201).json(result)
    //   })
    //   .catch(error=>next(error))
  })
  


  blogsRouter.delete('/:id', async (request,response, next)=>{


    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()

  //  Blog.findByIdAndDelete(request.params.id)
  //  .then(result=>{
  //   response.status(204).end()
  //  })
  //  .catch(error=>next(error))
  })


  blogsRouter.get('/:id', async (request,response, next)=>{

    const blog = await Blog.findById(request.params.id)
    if(blog){
      response.json(blog)
      
    }else{
      response.status(404).end()
    }
    

    // Blog.findById(request.params.id)
    // .then(blog=>{
    //   console.log(request.params.id)
    //   console.log(blog)
    //   response.json(blog)
    // })
  })

  blogsRouter.put('/:id', async(request,response,next)=>{

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