const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const helper = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

describe('when there is initially one user in db', ()=>{
    beforeEach(async ()=>{
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({username : 'root', passwordHash})

        await user.save()

    })

    test('creation succeeds with a fresh username', async ()=>{
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkained',
            password: 'salainen',
        }

        await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u=> u.username)
        assert(usernames.includes(newUser.username))
    })

    test('creation fails with proper statuscode and message if username already taken', async ()=>{
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()

        assert(result.body.error.includes('expected `username` to be unique'))

        assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })
})




describe('creating new user', async()=>{

    test('does not succeed when username is missing', async()=>{

        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            name: 'talha',
            username: '',
            password: 'helloworld'
        }
    
       const result = await api.post('/api/users')
        .send(newUser)
        .expect(403)
        
        const usersAtEnd =  await helper.usersInDb()

        assert(result.body.error.includes('username and password minimum 3 chars long required'))
        assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    
    })

    test('does not succeed when password is missing', async()=>{

        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            name: 'talha',
            username: 'abbelod101',
            password: ''
        }
        const result = await api.post('/api/users')
        .send(newUser)
        .expect(403)
        
        const usersAtEnd =  await helper.usersInDb()

        assert(result.body.error.includes('username and password minimum 3 chars long required'))

        assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })


    test('does not succeed when username and password is missing', async()=>{

        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            name: 'talha',
            username: '',
            password: ''
    
        }
        const result = await api.post('/api/users')
        .send(newUser)
        .expect(403)
        
        const usersAtEnd =  await helper.usersInDb()

        assert(result.body.error.includes('username and password minimum 3 chars long required'))
        assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    
    
    
    })


    test('does not succeed when username is less than 3 chars long', async()=>{

        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            name: 'talha',
            username: 'ab',
            password: '121131'
    
        }
        const result = await api.post('/api/users')
        .send(newUser)
        .expect(403)
        
        const usersAtEnd =  await helper.usersInDb()


        assert(result.body.error.includes('username and password minimum 3 chars long required'))

        assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    
    
    })


    test('does not succeed when password is less than 3 chars long', async()=>{

        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            name: 'talha',
            username: 'abbelod1010',
            password: '12'
    
        }
        const result = await api.post('/api/users')
        .send(newUser)
        .expect(403)
        
        const usersAtEnd =  await helper.usersInDb()

        assert(result.body.error.includes('username and password minimum 3 chars long required'))
        
        assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    
    })



})







after(async () => {
    await mongoose.connection.close()
})