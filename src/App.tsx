import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import { Users, LoginUser } from './models/model';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [credentials, setCredentials] = useState<Users[]>([]);

  const handleAddUser = (newUser: Users):boolean => {
    const emailExists = credentials.some(existingUser => existingUser.email === newUser.email);
  
    if (!emailExists) {
      setCredentials([...credentials, newUser]);
      return true
    }else{
      return false
    }
  };

  const verifyUser = (loginUser: LoginUser): boolean => {
    return credentials.some(existingUser =>
      existingUser.email === loginUser.email && existingUser.password === loginUser.password
    );
  };

  const getUser = (email: string):Users | null => {
    const foundUser = credentials.find(existingUser => existingUser.email === email);
    return foundUser || null
  };


  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login getUser={getUser} verifyUser={verifyUser} />} />
          <Route path="/register" element={<Register addUser={handleAddUser} />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
