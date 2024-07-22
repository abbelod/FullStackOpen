
const Notification = ({message})=>{
if(message === ''){
    return null
}

const success= {
    color: 'green',
    fontStyle: 'bold',
    fontSize: '20px',
    background: 'lightgrey',
    borderStyle: 'solic',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
}



return (

    <div style={success}>
        {message}
    </div>
)

}

export default Notification