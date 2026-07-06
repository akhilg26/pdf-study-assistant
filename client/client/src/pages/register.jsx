import { useState } from 'react'
import { useNavigate } from 'react-router'
import { register } from '../api/auth'



function Register(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    async function handleSubmit(e){
        e.preventDefault()
        const response = await register(username, password)
        const token = response.data.token
        const id = response.data.id
        localStorage.setItem('token', token)
        localStorage.setItem('id', id)
        navigate('/upload')
    }
    return <div>
        <div className='page-title'>
    <h1>Get Started!</h1>
    <p>Create an account to begin studying smarter with your personal assistant!</p>
        </div>  
        <form onSubmit={handleSubmit}>
            <label htmlFor='username'>Username: </label>
            <input id='username' name='username' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)}></input><br />
            <label htmlFor='password'>Password: </label>
            <input type='password' id='password' name='password' placeholder='abcd1234' value={password} onChange={(e) => setPassword(e.target.value)}></input> <br />
            <button>Register</button>
        </form>
        
    </div>
}

export default Register