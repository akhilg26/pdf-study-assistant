import uploadPDF from "../api/pdf"
import { useState } from 'react'
import { useNavigate } from 'react-router'

function Upload(){
    const [files, setFiles] = useState([])
    const [status, setStatus] = useState('Nothing yet')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    async function handleSubmit(e){
        e.preventDefault()
        const file = files[0] // handles multiple files
        if (!file){
            setStatus('File not uploaded: please select a file')
            return
        }
        setLoading(true)
        const token = localStorage.getItem('token')
        const response = await uploadPDF(file, token)
        if(response.success){
            setStatus('Upload successful')
            
        } else{
            setStatus('Upload failed')
        }

        setLoading(false)

    }
    return <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor='file'>File: </label>
            <input id='file' type='file' onChange={(e) => setFiles(e.target.files)}></input> <br />
            <button disabled={loading}>{loading ? 'Uploading...' :'Upload File'}</button> <br /> 
        </form>
        <div>{status}</div> 
        <button onClick={() => navigate('/chat')}>Go to Chat</button>
    </div>
}

export default Upload