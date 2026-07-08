import axios from 'axios'



async function register(username, password){
    const payload = {
        'username': username,
        'password': password
    }

    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, payload)
        console.log("Success:", response)
        return response
    }
    catch (error) {
        console.log(error)
    }

}

async function login(username, password){
    const payload = {
        'username': username,
        'password' : password
    }

    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, payload)
        console.log("Success: ", response)
        return response
    }
    catch (error) {
        console.log(error)
    }
}

export {register, login}
