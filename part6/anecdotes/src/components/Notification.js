import { useSelector } from 'react-redux'

const Notification = () => {
  const state = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (!state) {
    return null
  }

  return (
    <div style={style}>
      {state}
    </div>
  )
}

export default Notification