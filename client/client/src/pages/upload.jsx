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
        <div className='page-title'>
    <h1>Upload your notes!</h1>
    <p>Upload a pdf of your notes to your personanl study assistant!</p>
        </div>  
        <form onSubmit={handleSubmit}>
            <label htmlFor='file'>File: </label>
            <input id='file' type='file' onChange={(e) => setFiles(e.target.files)}></input> <br />
            <div style={{textAlign: 'center'}}><button disabled={loading}>{loading ? 'Uploading...' :'Upload File'}</button> </div><br /> 
        </form>
        <div style={{textAlign: 'center', marginTop: '10px'}}>{status}</div> 
        <div style={{textAlign: 'center', marginTop: '10px'}}><button onClick={() => navigate('/chat')}>Go to Chat</button></div>
    </div>
}

export default Upload