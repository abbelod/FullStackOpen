const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response)=>{

    console.log('post for creating user called')
    const {username, name, password} = request.body

    if(!username || username.length < 3 || !password || password.length < 3){
        return response.status(403).json({error: ' username and password minimum 3 chars long required'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User ({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request,response)=>{
    const users = await User.find({}).populate('blogs', {author: 1, title: 1})
    response.json(users)
})

module.exports = usersRouter