import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './Index';
import Register from './Register';
import Blank from './Blank';
import Login from './Login';
import Profile from './Profile';
import Expodetail from './Expodetail';
import Notifications from './Notifications';
import ExhibitorDetails from './ExhibitorDetails';

function App() {

  return (
    <Router>
      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/register" element={<Register/>} />
                        <Route path="/registeras" element={<Blank/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/profile" element={<Profile/>} />
                        <Route path="/details/expo/:id" element={<Expodetail/>} />
                        <Route path="/details/exhibitor/:id" element={<ExhibitorDetails/>} />
                        <Route path="/notifications" element={<Notifications/>} />
      </Routes>
    </Router>
  )
}

export default App
