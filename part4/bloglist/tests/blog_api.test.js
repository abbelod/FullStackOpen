const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blogs')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')



const api = supertest(app)





const getValidToken = async () => {

    const user = {
        username: 'testuser',
        password: 'fso101',
        name: 'talha'
    }

    await api.post('/api/users')
        .send(user)

    const loginUser = {
        username: 'testuser',
        password: 'fso101'
    }

    const response = await api.post('/api/login')
        .send(user)
        .expect(200)

    const authorization = 'Bearer ' + response._body.token
    return authorization
}




beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))

    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

})


describe('when there are blogs saved', async () => {

    const auth = await getValidToken()


    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })


    test('blog has propery named id', async () => {

        const response = await api.get('/api/blogs')
        const blog = response.body[0]

        assert.strictEqual(blog.hasOwnProperty('id'), true)

    })

    test('there are two blogs', async () => {

        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('the first blog is titled React Patterns', async () => {

        const response = await api.get('/api/blogs')

        const titles = response.body.map(r => r.title)

        assert(titles.includes('React patterns'))

    })


})

describe('adding a new blog', async () => {

    const auth = await getValidToken()


    test('fails when a token is not provided', async() => {

        const blogsAtStart = await helper.blogsinDb()

        const blogObject = {
            author: "test-author",
            url: "test-url",
            title: "test-title",
            likes: "0"
        }

       const response=  await api.post('/api/blogs')
        .send(blogObject)
        .expect(401)


    const blogsAtEnd = await helper.blogsinDb()

    assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)

    })


    test('succeeds when data is valid', async () => {


        const blogObject = {
            author: "test-author",
            url: "test-url",
            title: "test-title",
            likes: "0"
        }


        await api.post('/api/blogs')
            .send(blogObject)
            .set('Authorization', auth)
            .expect(201)
            .expect('Content-Type', /application\/json/)


        const blogs = await helper.blogsinDb()

        const titles = blogs.map(blog => blog.title)

        assert.strictEqual(blogs.length, helper.initialBlogs.length + 1)

        assert(titles.includes('test-title'))


    })


    test('returns status code 400 when data is invalid', async () => {


        const blogObject = {
            title: 'test-author-2',
            author: 'mark twain'
        }

        const blogObject2 = {
            url: "www.com",
            author: 'mark-wain'
        }

        await api.post('/api/blogs')
            .send(blogObject)
            .set('authorization', auth)
            .expect(400)

        await api.post('/api/blogs')
            .send(blogObject2)
            .set('Authorization', auth)
            .expect(400)

        const blogs = await helper.blogsinDb()
        assert.strictEqual(blogs.length, helper.initialBlogs.length)

    })



    test('succeeds if likes is missing  (it defaults to 0)', async () => {

        await Blog.deleteMany({})

        const blogObject =
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            __v: 0
        }

        await api.post('/api/blogs')
            .send(blogObject)
            .set('Authorization', auth)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogs = await helper.blogsinDb()

        assert(blogs[0].hasOwnProperty('likes'))

        assert.strictEqual(blogs[0].likes, 0)

    })


})


describe('a specific blog', async () => {

const auth = await getValidToken()


    test('can be viewed', async () => {
        const blogsAtStart = await helper.blogsinDb()

        const blogToView = blogsAtStart[0]

        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.deepStrictEqual(resultBlog.body, blogToView)
    })

    test('can be deleted', async () => {

        
        await Blog.deleteMany({})

        const blogsAtStart = await helper.blogsinDb()

        const blogObject = {
            title: "React patterns",
            author: "Michael ",
            url: "https://reactpatterns.com/",
            __v: 0,
            user: {

            }
        }

        await api.post('/api/blogs')
        .send(blogObject)
        .set('Authorization', auth)
        .expect(201)

        const oneBlog = await Blog.findOne({})

        const blogsAfterAdd = await helper.blogsinDb()
        assert.strictEqual(blogsAtStart.length + 1, blogsAfterAdd.length)

        await api
            .delete(`/api/blogs/${oneBlog._id.toString()}`)
            .set('Authorization', auth)
            .expect(204)

        const blogsAtEnd = await helper.blogsinDb()
        assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)

    })



    test('can be updated', async () => {

        const updatedBlog =
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 70,
            __v: 0
        }

        const response = await api.put(`/api/blogs/5a422a851b54a676234d17f7`)
            .send(updatedBlog)
            .expect(200)

        const blogAfterUpdate = await api.get('/api/blogs/5a422a851b54a676234d17f7')

        assert.strictEqual(blogAfterUpdate.body.likes, updatedBlog.likes)

    })

})






after(async () => {
    await mongoose.connection.close()
})