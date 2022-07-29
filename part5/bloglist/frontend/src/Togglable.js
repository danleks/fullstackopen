import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'


const Togglable = forwardRef(({ children, buttonTitle }, ref) => {
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible(prevState => !prevState)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div  style={{ display: visible ? '' : 'none' }}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
      <div style={{ display: visible ? 'none': '' }}>
        <button onClick={toggleVisibility}>{buttonTitle}</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  buttonTitle: PropTypes.string.isRequired,
}

export default Togglable