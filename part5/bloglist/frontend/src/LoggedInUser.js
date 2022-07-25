const LoggedInUser = ({ username, handleLogout }) => {
  return (
    <div>
      <div>
        {username} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  )
}

export default LoggedInUser