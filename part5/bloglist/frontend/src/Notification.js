const Notification = ({ error, message }) => {
  return (
    <div>
      {error
        ? <span>ERROR: {message}</span>
        : <span>{message}</span>
      }
    </div>
  )
}

export default Notification