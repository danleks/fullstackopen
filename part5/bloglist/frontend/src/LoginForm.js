const LoginForm = ({ loginForm, handleInputValue, handleLogin }) => {
  return (
    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <div>
        <label>
            username
          <input
            id='username'
            type='text'
            name='username'
            value={loginForm.username}
            onChange={handleInputValue}
          />
        </label>
      </div>
      <div>
        <label>
                password
          <input
            id='password'
            type='password'
            name='password'
            value={loginForm.password}
            onChange={handleInputValue}
          />
        </label>
      </div>
      <button>login</button>
    </form>
  )
}

export default LoginForm