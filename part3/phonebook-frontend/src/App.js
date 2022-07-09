import {useState, useEffect} from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personsService from './services/persons';
import Notification from "./Notification";

const App = () => {
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [persons, setPersons] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const [filteredPersons, setFilteredPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const personsToShow = filterValue ? filteredPersons: persons;
    const [message, setMessage] = useState({
        type: '', // success or error
        message: '',
    });

    const filterPersons = (e) => {
        setFilterValue(e.target.value);
        let newPersons = persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredPersons(newPersons);
    }

    const handleDeletePerson = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            personsService.remove(id);
            setPersons(prevState => prevState.filter(person => person.id !== id))
        }
    };
    const handleNewNameChange = e => setNewName(e.target.value);
    const handleNewNumberChange = e => setNewNumber(e.target.value);
    const handleNewPersonAdd = (e) => {
        e.preventDefault();
        const duplicateName = persons.find(person => person.name === newName);
        // if (duplicateName) {
        //     alert(`${newName} is already added to phonebook, replace the old number with a new one ? `);
        //     const person = persons.find(person => person.name === newName);
        //     const changedPerson = {...person, number: newNumber}
        //     personsService
        //         .update(changedPerson.id, changedPerson)
        //         .then(changedPerson => {
        //             setPersons(prevState => prevState.map(person => person.name !== newName ? person : changedPerson))
        //         })
        //         .catch(e => {
        //             console.log('error');
        //             setMessage({
        //                 type: 'error',
        //                 message: `Person ${person.name} has already been removed from the server`,
        //             });
        //         })
        //     return;
        // }
        const newPerson = {
            name: newName,
            number: newNumber,
        }

        personsService
            .create(newPerson)
            .then(returnedPerson => {
                setIsError(false)
                setPersons(prevState => prevState.concat(returnedPerson));
                setMessage({
                    type: 'success',
                    message: `Added ${returnedPerson.name}`
                })
                setNewName('');
                setNewNumber('');
                setTimeout(() => {
                    setMessage({
                        type: null,
                        message: ''
                    })
                }, 3000)
            })
            .catch(error => {
                // this is the way to access the error message
                setIsError(true);
                setErrorMessage(error.response.data.error);
                console.log(error)
            })
    }

    useEffect(() => {
        personsService
            .getAll()
            .then(initialPersons => setPersons(initialPersons))
            .catch(error => {
                console.log(error.response.data)
            })
    }, [])

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={message}/>
            <p style={{color: 'red'}}>{isError ? errorMessage : null}</p>
            <Filter filterValue={filterValue} filterPersons={filterPersons}/>
            <h2>add a new</h2>
            <PersonForm handleNewPersonAdd={handleNewPersonAdd} newName={newName} newNumber={newNumber} handleNewNameChange={handleNewNameChange} handleNewNumberChange={handleNewNumberChange}/>
            <h2>Numbers</h2>
            <Persons handleDeletePerson={handleDeletePerson} personsToShow={personsToShow}/>
        </div>
    );
};

export default App;