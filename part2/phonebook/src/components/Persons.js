const Person = ({person}) => <div>{person.name} {person.number}</div>
const Persons = ({persons, personsFilter}) => <>{persons.filter(personsFilter).map((person) => <Person key={person.id}person={person}/>)}</>

export default Persons