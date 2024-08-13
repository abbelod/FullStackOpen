const Blog = require('../models/blogs')

const initialBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
   {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    }
  ]

  const nonExistingId = async ()=>{
    const blog = new Blog(
        {
            author: 'martin',
            url:'www.com',
            likes: "0",
            title: 'helo'
        }
    )

    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsinDb = async ()=>{

    const blogs = await Blog.find({})
    return blogs.map(blog=> blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsinDb
}
