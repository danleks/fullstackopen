import BlogListItem from './BlogListItem'
import blogService from './services/blog'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const BlogsList = ({ blogs }) => {
  const [blogList, setBlogList] = useState(blogs)

  useEffect(() => {
    setBlogList(blogs)
  }, [blogs])

  const handleLike = async (blog) => {
    const updatedBlog = {
      user: blog.user.id,
      likes: ++blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    const result = await blogService.update(blog.id, updatedBlog)
    setBlogList(prevState => prevState.map(b => b.id !== blog.id ? b : result))
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Do you really want to delete ${blog.title}`)) {
      await blogService.remove(blog.id)
      setBlogList(prevState => prevState.filter(b => b.id !== blog.id))
    }

    return null
  }

  return (
    <div>
      <ul>
        {
          blogList
            .sort((a,b) => b.likes - a.likes)
            .map(blog => <BlogListItem handleDelete={handleDelete} handleLike={handleLike} key={blog.title} blog={blog}/>)
        }
      </ul>
    </div>
  )
}

BlogsList.propTypes = {
  blogs: PropTypes.array.isRequired,
}

export default BlogsList