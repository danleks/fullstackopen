import * as React from 'react'
import { useDispatch } from 'react-redux'
import { createFilter } from '../reducers/filterReducer'

const Filter = () => {
  const [filter, setFilter] = React.useState('')
  const dispatch = useDispatch()

  const style = {
    marginBottom: 10
  }


  const handleFilterChange = (e) => {
    const filterValue = e.target.value
    setFilter(filterValue)
    dispatch(createFilter(filterValue))
  }

  return (
    <form style={style}>
      <label>
          filter
        <input name='filter' id='filter' value={filter} onChange={handleFilterChange}/>
      </label>
    </form>
  )
}

export default Filter