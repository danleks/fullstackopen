import PropTypes from 'prop-types'

const Notification = ({ error, message }) => {
  if (!message) {
    return null
  }
  return (
    <div className='message' style={{ background: error ? 'red' : 'green' }}>
      {error
        ? <span>ERROR: {message}</span>
        : <span>{message}</span>
      }
    </div>
  )
}

Notification.propTypes = {
  error: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
}

export default Notification