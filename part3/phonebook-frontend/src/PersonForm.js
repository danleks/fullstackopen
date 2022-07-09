const PersonForm = ({handleNewPersonAdd, newName, newNumber, handleNewNameChange, handleNewNumberChange}) => {
    return (
        <form onSubmit={handleNewPersonAdd}>
            <div>
                <label>
                    name
                    <input value={newName} onChange={handleNewNameChange} />
                </label>
            </div>
            <div>
                <label>
                    number
                    <input value={newNumber} onChange={handleNewNumberChange} />
                </label>
            </div>
            <div>
                <button>add</button>
            </div>
        </form>
    );
};

export default PersonForm;