import SinglePerson from "./SinglePerson";

const Persons = ({personsToShow, handleDeletePerson}) => {
    return (
        <ul>
            {personsToShow.map(person => <SinglePerson handleDeletePerson={handleDeletePerson} key={person.name} id={person.id} name={person.name} number={person.number}/>)}
        </ul>
    );
};

export default Persons;