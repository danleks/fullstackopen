const mostBlogs = require('../utils/list_helper').mostBlogs
const blogs = require('./blogs.raw.data')

describe('most blogs', () => {
    test ('when having multiple blogs, shows the author with most', () => {
        expect(mostBlogs(blogs)).toEqual({
            author: "Robert C. Martin",
            blogs: 3,
        })
    })

    test('when having single blog, shows the author for this blog', () => {
        expect(mostBlogs(blogs.slice(0,1))).toEqual({
            author: blogs.slice(0,1)[0].author,
            blogs: 1
        })
    })

    test ('when having empty array, shows null', () => {
        expect(mostBlogs([])).toEqual(null)
    })
})