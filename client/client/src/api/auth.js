import axios from 'axios'


async function register(username, password){
    const payload = {
        'username': username,
        'password': password
    }

    try {
        const response = await axios.post('http://localhost:8000/api/auth/register', payload)
        console.log("Success:", response)
        return response
    }
    catch (error) {
        console.log(error)
    }

}

export default register