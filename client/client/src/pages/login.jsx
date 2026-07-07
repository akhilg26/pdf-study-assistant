import { useState } from 'react'
import { useNavigate } from 'react-router'
import { login } from '../api/auth'

function Login(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    async function handleSubmit(e){
        e.preventDefault()
        const response = await login(username, password)
        const token = response.data.token
        localStorage.setItem('token', token)
        const id = response.data.id
        localStorage.setItem('id', id)
        navigate('/upload')

    }
    return <div>
        <div className='page-title'>
    <h1>Login!</h1>
    <p>Login to your account to study with your personal assistant!</p>
        </div>  
        <form onSubmit={handleSubmit}>
            <label htmlFor='username'>Username: </label>
            <input id='username' name='username' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)}></input> <br />
            <label htmlFor='password'>Password: </label>
            <input type='password' id='password' name='password' placeholder='abcd1234' value={password} onChange={(e) => setPassword(e.target.value)}></input> <br />
            <button>Login</button>
        </form>
        <div className='page-title'>
            <p style={{marginTop: '20px'}}>Don't have an account?</p> <br />
            <button onClick={() => navigate('/register')}>Register</button>
        </div>
    </div>
}

export default Login