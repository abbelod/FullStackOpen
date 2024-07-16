const PersonForm = (props) =>{

    return(
  
  <form onSubmit={props.buttonSubmit}>
          <div>
            name: <input onChange={props.handleformChange} />
          </div>
          <div>
            number: <input onChange={props.handleNumberChange} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
  
    )
  }

  export default PersonForm