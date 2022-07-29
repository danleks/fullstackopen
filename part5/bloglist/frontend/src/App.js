import Header from './Header'
import LoggedInUser from './LoggedInUser'
import BlogsList from './BlogsList'
import { useState, useEffect, useRef } from 'react'
import LoginForm from './LoginForm'
import blogService from './services/blog'
import loginService from './services/login'
import NewBlogForm from './NewBlogForm'
import Notification from './Notification'
import Togglable from './Togglable'

const LOGIN_FORM_INIT_VALUES = {
  username: '',
  password: '',
}

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loginForm, setLoginForm] = useState(LOGIN_FORM_INIT_VALUES)
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  const newNoteFormRef = useRef(null)

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const result = await blogService.read()
        setBlogs(result)
        setIsLoading(false)
      }
      fetchData()
    }
  }, [user])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('LOGGED_IN_USER')
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser)
      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
    }
  }, [])

  const handleMessage = (content) => {
    setMessage(content)

    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  const handleInputValue = event => {
    setLoginForm(prevState => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      }
    })
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const result = await loginService.login({ username: loginForm.username, password: loginForm.password })
      setUser(result)
      window.localStorage.setItem('LOGGED_IN_USER', JSON.stringify(result))
      blogService.setToken(result.token)
      setLoginForm(LOGIN_FORM_INIT_VALUES)
      handleMessage('Successfully logged in')
    } catch(error) {
      setError(true)
      handleMessage(error.response.data.error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('LOGGED_IN_USER')
    handleMessage('Successfully logged out')
  }

  const addNote = async (note) => {
    const result = await blogService.create(note)
    setBlogs(prevState => prevState.concat(result))
    newNoteFormRef.current.toggleVisibility()
  }

  return (
    <div>
      <Notification error={error} message={message} />
      {user === null
        ? <LoginForm loginForm={loginForm} handleInputValue={handleInputValue} handleLogin={handleLogin}/>
        : <>
          <Header/>
          <LoggedInUser username={user.username} handleLogout={handleLogout}/>
          <Togglable buttonTitle='new note' ref={newNoteFormRef}>
            <NewBlogForm
              addNote={addNote}
              handleMessage={handleMessage}
            />
          </Togglable>
          {isLoading ? 'Loading ...' : <BlogsList blogs={blogs}/>}
        </>
      }
    </div>
  )
}

export default App