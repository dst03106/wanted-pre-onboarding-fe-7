import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Signup from './Signup';
import Todo from './Todo';


function App() {
  const token = localStorage.getItem('token');

  return (
    <div>
      <Routes>
        <Route path="/todo" element={<Todo />} />
        <Route path="/" element={<Signup />} />
        {/* <Route path="/todo" element={!token ? < Navigate replace to="/" /> : <Todo />} />
        <Route path="/" element={token ? <Navigate replace to="/todo" /> : <Signup />} /> */}
      </Routes>
    </div>
  );
}

export default App;