const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => sum + blog.likes

    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const createObj = (obj) => {
        return {
            title: obj.title,
            author: obj.author,
            likes: obj.likes,
        }
    }
    const reducer = (prev, current) => {
        return (prev.likes > current.likes) ? createObj(prev) : createObj(current)
    }

    return blogs.length === 0
        ? null
        : blogs.reduce(reducer, 0)
}

const mostBlogs = (blogs) => {
    const reducer = (acc, cur) => {
        if (cur.author in acc) {
            acc[cur.author].blogs += 1
        } else {
            acc[cur.author] = {
                author: cur.author,
                blogs: 1
            }
        }

        return acc
    }

    const authorAndBlogsArray = Object.values(blogs.reduce(reducer, {}))

    const maxNoOfBlogs = Math.max(...authorAndBlogsArray.map(author => author.blogs))

    return blogs.length === 0
        ? null
        : authorAndBlogsArray.filter(author => author.blogs === maxNoOfBlogs)[0]
}

const mostLikes = (blogs) => {
    const createObj = (obj) => {
        return {
            author: obj.author,
            likes: obj.likes,
        }
    }
    const reducer = (prev, current) => {
        return (prev.likes > current.likes) ? createObj(prev) : createObj(current)
    }

    return blogs.length === 0
        ? null
        : blogs.reduce(reducer, 0)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}