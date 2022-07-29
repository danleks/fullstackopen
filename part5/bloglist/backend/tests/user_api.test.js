const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('admin1', 10)

    const user = new User({
        username: 'admin',
        name: 'tomasz',
        passwordHash
    })

    await user.save()
}, 100000)

describe('viewing users', () => {
    test('all the users are shown in json format', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)
})

describe('creating a new user with admin user in db', () => {
    test('creation of a new user succeeds with proper status code', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'danleks',
            name: 'alex',
            password: 'qwerty1'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
    test('creation of a duplicate username fails with proper status code', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'admin',
            name: 'lukasz',
            password: 'admin2'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(result.body.error).toContain('username must be unique')
        expect(usersAtEnd).toEqual(usersAtStart)
    })
    test('creation of a new user with improper username or password length fails with proper status code', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'to0',
            name: 'Peter',
            password: '32'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(result.body.error).toContain('username and password must be at least 3 chars long')
        expect(usersAtEnd).toEqual(usersAtStart)

    })
    test('creation of a new user without username or password fails with proper status code', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: '',
            name: 'tom',
            password: '1234'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()

        expect(result.body.error).toContain('username and password should be provided')
        expect(usersAtEnd).toEqual(usersAtEnd)
    })
})