
const Notification = ({message})=>{
    if(message === ''){
        return null
    }
    
    const error= {
        color: 'red',
        fontStyle: 'bold',
        fontSize: '20px',
        background: 'lightgrey',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }
    
    
    
    return (
    
        <div style={error}>
            {message}
        </div>
    )
    
    }
    
    export default Notification