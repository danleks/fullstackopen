import { useState } from 'react'
import PropTypes from 'prop-types'

const NEW_NOTE_INIT_VAL = {
  title: '',
  author: '',
  url: '',
}

const NewBlogForm = ({ addNote , handleMessage }) => {
  const [newNote, setNewNote] = useState(NEW_NOTE_INIT_VAL)
  const handleNewNote = event => {
    setNewNote(prevState => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      }
    })
  }

  const handleNewNoteFormSubmit = event => {
    event.preventDefault()
    addNote(
      {
        title: newNote.title,
        author: newNote.author,
        url: newNote.url,
      }
    )

    setNewNote(NEW_NOTE_INIT_VAL)
    handleMessage(`a new blog ${newNote.title} by ${newNote.author} added`)
  }
  return (
    <form onSubmit={handleNewNoteFormSubmit}>
      <h2>Create new blog</h2>
      <div>
        <label>
        title
          <input
            id='title'
            type='text'
            name='title'
            value={newNote.title}
            onChange={handleNewNote}
          />
        </label>
      </div>
      <div>
        <label>
          author
          <input
            id='author'
            type='text'
            name='author'
            value={newNote.author}
            onChange={handleNewNote}
          />
        </label>
      </div>
      <div>
        <label>
          url
          <input
            id='url'
            type='text'
            name='url'
            value={newNote.url}
            onChange={handleNewNote}
          />
        </label>
      </div>
      <button>create</button>
    </form>
  )
}

NewBlogForm.propTypes = {
  addNote: PropTypes.func.isRequired,
  handleMessage: PropTypes.func.isRequired,
}

export default NewBlogForm