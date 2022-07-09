const SinglePerson = ({name, number, id, handleDeletePerson}) => {
    return (<li key={name}>{name} {number} <button onClick={() => handleDeletePerson(id, name)}>delete</button></li>);
};

export default SinglePerson;