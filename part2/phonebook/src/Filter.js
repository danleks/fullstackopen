const Filter = ({filterValue, filterPersons}) => {
    return (
        <div>
            <label>
                filter shown with
                <input value={filterValue} onChange={filterPersons}/>
            </label>
        </div>
    );
};

export default Filter;