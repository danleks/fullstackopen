const totalLikes = require('../utils/list_helper').totalLikes
const blogs = require('./blogs.raw.data')

describe('total likes', () => {
    test('of empty list is zero', () => {
        expect(totalLikes([])).toBe(0)
    })

    test('of list having single value to be equal to itself', () => {
        expect(totalLikes(blogs.slice(0,1))).toBe(7)
    })

    test('of larger list to be calculated right', () => {
        expect(totalLikes(blogs)).toBe(36)
    })
})