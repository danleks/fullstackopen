import Header from './Header'
import LoggedInUser from './LoggedInUser'
import BlogsList from './BlogsList'
import { useState, useEffect } from 'react'
import LoginForm from './LoginForm'
import blogService from './services/blog'
import loginService from './services/login'
import NewNoteForm from './NewNoteForm'
import Notification from './Notification'

const LOGIN_FORM_INIT_VALUES = {
  username: '',
  password: '',
}

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loginForm, setLoginForm] = useState(LOGIN_FORM_INIT_VALUES)
  const [newNoteForm, setNewNoteForm] = useState({
    title: '',
    author: '',
    url: '',
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const result = await blogService.read()
        setBlogs(result)
        setIsLoading(false)
        console.log(result)
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
      setMessage('Successfully logged in')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    } catch(error) {
      setError(true)
      setMessage(error.response.data.error)
      setTimeout(() => {
        setError(false)
        setMessage('')
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('LOGGED_IN_USER')
    setMessage('Successfully logged out')
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  const handleNewNoteForm = event => {
    setNewNoteForm(prevState => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      }
    })
  }

  const handleNewNoteFormSubmit = async (event) => {
    event.preventDefault()
    const result = await blogService.create({
      title: newNoteForm.title,
      author: newNoteForm.author,
      url: newNoteForm.url,
    })

    setBlogs(prevState => prevState.concat(result))
    setMessage(`a new blog ${newNoteForm.title} by ${newNoteForm.author} added`)
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  return (
    <div>
      <Notification error={error} message={message} />
      {user === null
        ? <LoginForm loginForm={loginForm} handleInputValue={handleInputValue} handleLogin={handleLogin}/>
        : <>
          <Header />
          <LoggedInUser username={user.username} handleLogout={handleLogout}/>
          <NewNoteForm newNoteForm={newNoteForm} handleNewNoteForm={handleNewNoteForm} handleNewNoteFormSubmit={handleNewNoteFormSubmit}/>
          {isLoading ? 'Loading ...' : <BlogsList blogs={blogs}/>}
        </>
      }
    </div>
  )
}

export default App