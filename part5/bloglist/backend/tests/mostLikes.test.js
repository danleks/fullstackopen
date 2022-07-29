const mostLikes = require('../utils/list_helper').mostLikes
const blogs = require('./blogs.raw.data')

describe('favorite blog', () => {
    test('when having multiple values, shows correct object', () => {
        expect(mostLikes(blogs)).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 12,
        })
    })

    test('when having single object, shows the object itself', () => {
        expect(mostLikes(blogs.slice(0,1))).toEqual({
            author: "Michael Chan",
            likes: 7,
        })
    })

    test('when having empty array, shows null', () => {
        expect(mostLikes([])).toEqual(null)
    })
})