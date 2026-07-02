import axios from 'axios'

async function queryPDF(question, token){
    const payload = {
        'query' : question
    }
    try {
        const response = await axios.post('http://localhost:8000/api/query/', payload, {headers: {
        'Authorization': `Bearer ${token}`
    }})
    return {'message': 'query success', 'response' : response}
}
    catch (error) {
        console.log(error)
        return { message: 'query failure', error: error.response?.data?.detail || 'Something went wrong' }
    }
}

export default queryPDF