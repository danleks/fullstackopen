const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)
let token

beforeEach(async () => {
    await Blog.deleteMany({})

    const result = await api
        .post('/api/login')
        .send({
            username: 'admin',
            password: 'admin1'
        })

    const blogObjects = helper.initialBlogs.map(blog => new Blog({...blog, user: result.body.id}))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

    token = result.body.token
}, 1000000)

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 1000000)

test('correct number of blogs is returned', async () => {
    const response = await api
        .get('/api/blogs')
        .set('Authorization', `Bearer ${token}`)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 1000000)

test('unique identifier property of the blog posts is named id', async () => {
    const response = await api
        .get('/api/blogs')
        .set('Authorization', `Bearer ${token}`)

    response.body.forEach(r => {
        expect(r.id).toBeDefined()
    })
}, 1000000)

test('HTTP POST successfully creates a new blog post', async () => {
    const newBlog = {
            title: 'blog for testing',
            author: 'test',
            url: 'www.google.com',
            likes: 44
        }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain(newBlog.title)
}, 1000000)

test('verifies that if the likes property is missing, it will default to the value 0.', async () => {
    const newBlog = {
        title: 'testing for missing likes',
        author: 'test',
        url: 'www.google.com',
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.at(-1)).toHaveProperty('likes', 0)
})

test('verifies if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request.', async () => {
    const newBlog = {
        author: 'test',
        like: 3,
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
}, 1000000)

describe('deletion of blog post', () => {
    test('deletes blog post if id is correct', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const noteToDelete = blogsAtStart[0]
      
        await api
            .delete(`/api/blogs/${noteToDelete.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

        const titles = blogsAtEnd.map(r => r.title)
        expect(titles).not.toContain(noteToDelete.title)
    })
})

describe('updating a specific blog', () => {
    test('updates blog with valid id', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const updatedBlog = {...blogToUpdate, likes: 200}

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedBlog)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd[0].likes).toBe(updatedBlog.likes)
    })
})


afterAll(() => {
    mongoose.connection.close()
})