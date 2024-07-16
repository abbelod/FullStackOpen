const Persons = (props)=>{
    return (
  <div>
  
      {props.persons.map(person => {
        if (person.name.toLowerCase().search(props.newSearch.toLowerCase()) != -1)
          return <p key={person.id}>{person.name} {person.number}</p>
      })}
  
      </div>
    )
  }

  export default Persons