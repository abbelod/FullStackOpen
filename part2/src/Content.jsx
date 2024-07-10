const Content = ({parts}) =>{
    return(
  
      <>
      {
        parts.map((part, index) => 
          <p key = {index}>{part.name} {part.exercises}</p>
        )
      }
      <h3>total of {
      
        parts.reduce((sum, part) => {
          return sum + part.exercises 
        }, 0 )
        }
       &nbsp;exercises
        </h3>
      </>
      
        
    )
       
    
  }


  export default Content