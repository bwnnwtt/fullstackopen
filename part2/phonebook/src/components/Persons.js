const Person = ({person, handleDeleteClick}) => <div>{person.name} {person.number} <button key={person.id} onClick={() => handleDeleteClick(person)}>delete</button></div>
const Persons = ({persons, personsFilter, handleDeleteClick}) => <>{persons.filter(personsFilter).map((person) => <Person key={person.id}person={person} handleDeleteClick={handleDeleteClick}/>)}</>

export default Persons