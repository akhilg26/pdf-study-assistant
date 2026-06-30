import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import './App.css'
import Register from './pages/register'
import Login from './pages/login'
import Upload from './pages/upload'
import Chat from './pages/chat'

function App() {
  
      return <BrowserRouter>
<Routes>
  <Route path='/' element={<Navigate to='/register'/>}></Route>
  <Route path='/register' element={<Register />}></Route>
  <Route path='/login' element={< Login />}></Route>
  <Route path='/upload' element={< Upload />}></Route>
  <Route path='/chat' element={<Chat />}></Route>
</Routes>

</BrowserRouter>
}



export default App
