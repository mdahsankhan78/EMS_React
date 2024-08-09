import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './Index';
import Register from './Register';
import Login from './Login';
import Blank from './Blank';
import ExhibitorDetails from './ExhibitorDetials';
import Expodetail from './Expodetail';
import Bookmarked from './Bookmarked';
function App() {

  return (
    <>
      <Router>
      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/register" element={<Register/>} />
                        <Route path="/registeras" element={<Blank/>} />
                        <Route path="/login" element={<Login/>} />
                        {/* <Route path="/profile" element={<Profile/>} /> */}
                        <Route path="/details/expo/:id" element={<Expodetail/>} />
                        <Route path="/details/exhibitor/:id" element={<ExhibitorDetails/>} />
                        <Route path="/bookmarked/sessions" element={<Bookmarked/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
