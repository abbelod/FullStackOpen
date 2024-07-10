import Content from './Content'

const Course = ({course}) =>{
    return (
     <>
      <h1>{course.name}</h1>
      <Content parts = {course.parts}> </Content>
     </> 
    )
    
    }


export default Course