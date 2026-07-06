import { useState } from 'react'
import queryPDF from '../api/query'
import { useNavigate } from 'react-router'

function Chat(){
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [query, setQuery] = useState('')
    const [response, setResponse] = useState('')
    async function handleSubmit(e){
        e.preventDefault()
        const result = await queryPDF(query, token)
        if (!result.response){
            setResponse(`Error: ${result.error}`)
        } else{
        setResponse(result.response.data.response)
        }
    }

    return <div>
        <div className='page-title'>
    <h1>Study with your personal assistant!</h1>
    <p>Ask any questions you would like!</p></div>
        <form onSubmit={handleSubmit}>
            <label htmlFor='query'>Query: </label>
            <input id='query' name='query' placeholder='Start typing your question' value={query} onChange={(e) => setQuery(e.target.value)}></input> <br />
            <button>Submit question</button>
        </form>
        {response && <div>{response}</div>}
        
        <div style={{textAlign: 'center', marginTop: '10px'}}><button onClick={() => navigate('/upload')}>Upload</button></div>
    </div>



}

export default Chat