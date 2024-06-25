import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Resume from 'pages/Resume' // Adjust the import path as necessary
import Projects from 'pages/Projects' // Adjust the import path as necessary
import './styles/index.css'
import Navbar from 'components/NavBar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Resume />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
