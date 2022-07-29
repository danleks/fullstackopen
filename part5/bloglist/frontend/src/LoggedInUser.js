import PropTypes from 'prop-types'

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

LoggedInUser.propTypes = {
  username: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
}

export default LoggedInUser