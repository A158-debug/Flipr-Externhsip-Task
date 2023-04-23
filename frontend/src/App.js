import React from 'react'

import { Container } from '@mui/material';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Auth from './components/Auth/Auth';

import { BrowserRouter, Routes, Route } from 'react-router-dom';



const App = () => {

  return (
    <>
    <BrowserRouter>
        <Container maxWidth="xl">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  )
}

export default App