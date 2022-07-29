const favoriteBlog = require('../utils/list_helper').favoriteBlog
const blogs = require('./blogs.raw.data')

describe('favorite blog', () => {
    test('when having multiple values, show correct object', () => {
        expect(favoriteBlog(blogs)).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12,
        })
    })

    test('when having single object, show the object itself', () => {
        expect(favoriteBlog(blogs.slice(0,1))).toEqual({
            title: "React patterns",
            author: "Michael Chan",
            likes: 7,
        })
    })

    test('when having empty array, show null', () => {
        expect(favoriteBlog([])).toEqual(null)
    })
})