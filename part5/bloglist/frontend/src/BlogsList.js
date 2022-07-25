const BlogsList = ({ blogs }) => {
  return (
    <ul>
      {
        blogs.map(blog => <li key={blog.title}>{blog.title}</li>)
      }
    </ul>
  )
}

export default BlogsList