import axios from 'axios'

async function uploadPDF(file, token){
    const formData = new FormData()
    formData.append('file', file)
    console.log(formData) // delete later
    try {
        const response = await axios.post('http://localhost:8000/api/pdf/upload', formData, {headers: {
            'Authorization' : `Bearer ${token}`
        }})
        console.log(response)
        return {success: true, data: response.data}
    } catch(error){
        console.log(error)
        return { success: false, message: error.response?.data?.detail || "Upload failed" }
    }
    
}

export default uploadPDF