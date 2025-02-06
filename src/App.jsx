import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import Player from './pages/Player/Player.jsx';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.js';
import { ToastContainer, toast } from 'react-toastify';

const App = () => {

  const navigate =useNavigate();

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Logged In");
      navigate('/', { replace: true });
    } else {
      console.log("Logged Out");
      navigate('/login', { replace: true });
    }
  });

  return () => unsubscribe();
}, []);

  return (
    <main>
      <ToastContainer  theme='dark' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />
      </Routes>
    </main>
  );
};

export default App;
