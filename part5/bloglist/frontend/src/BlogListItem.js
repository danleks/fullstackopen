import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const BlogListItem = ({ blog, handleLike, handleDelete }) => {
  const [visible, setVisible] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('LOGGED_IN_USER'))
    setCurrentUser(loggedUser.username)
  }, [])
  const blogStyle = {
    padding: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    listStyle: 'none'
  }
  const toggleVisibility = () => {
    setVisible(prevState => !prevState)
  }

  return (
    <li className='blogItem' style={blogStyle}>
      <div>{blog.title} {blog.author} <button className='showButton' onClick={toggleVisibility}>{visible ? 'hide': 'show'}</button></div>
      {
        visible
          ? (
            <div>
              <div>{blog.url}</div>
              <div className='numberOfLikes'>likes: {blog.likes}<button className='likeButton' onClick={() => handleLike(blog)}>like</button></div>
              <div>{blog.user.username}</div>
              {currentUser === blog.user.username ? <button onClick={() => handleDelete(blog)}>remove</button> : null}
            </div>
          )
          : null
      }
    </li>
  )
}

BlogListItem.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default BlogListItem