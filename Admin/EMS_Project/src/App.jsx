import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import Index from './Index';
import Register from './Register';
import Login from './Login';
import Expocreate from './Expocreate';
import Notifications from './Notifications';
import Expoupdate from './Expoupdate';
import Expos from './Expos';
import Exhibitors from './Exhibitors';
import Attendees from './Attendees';
import Contacts from './Contacts';

function App() {

  return (
    <>
      <Router>
      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/register" element={<Register/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/events" element={<Expos/>} />
                        <Route path="/exhibitors" element={<Exhibitors/>} />
                        <Route path="/attendees" element={<Attendees/>} />
                        <Route path="/create/expo" element={<Expocreate/>} />
                        <Route path="/update/expo/:id" element={<Expoupdate/>} />
                        <Route path="/notifications" element={<Notifications/>} />
                        <Route path="/contacts" element={<Contacts/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
