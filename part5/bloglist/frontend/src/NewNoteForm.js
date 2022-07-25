const NewNoteForm = ({ newNoteForm, handleNewNoteForm, handleNewNoteFormSubmit }) => {
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
            value={newNoteForm.title}
            onChange={handleNewNoteForm}
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
            value={newNoteForm.author}
            onChange={handleNewNoteForm}
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
            value={newNoteForm.url}
            onChange={handleNewNoteForm}
          />
        </label>
      </div>
      <button>create</button>
    </form>
  )
}

export default NewNoteForm