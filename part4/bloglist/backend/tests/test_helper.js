const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = [
    {
        title: 'Travelling to Greece',
        author: 'danleks',
        url: 'www.google.com',
        likes: 10
    },
    {
        title: 'Cooking healthy food',
        author: 'marina',
        url: 'www.google.com',
        likes: 4
    },
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb,
    usersInDb,
}