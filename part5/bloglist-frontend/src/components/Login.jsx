import {useState} from 'react'
import PropTypes from 'prop-types'


const LoginForm = ({loginUser}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit =(event)=>{
        event.preventDefault()

        loginUser({
            username, password
        })

        setUsername('')
        setPassword('')
    }
    return (

        <form onSubmit={handleSubmit}>
            <div>
                username
                <input
                data-testid='username'
                 type="text"
                    value={username}
                    name="Username"
                    onChange={({target})=> setUsername(target.value)} />

            </div>

            <div>
                password
                <input type="password"
                data-testid='password'
                    value={password}
                    name='Password'
                    onChange={({target})=> setPassword(target.value)} />
            </div>
            <button type='submit'>login</button>
        </form>
    )

}




export default LoginForm