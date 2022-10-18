import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from './containers/Login';
import Todos from './containers/Todos';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/todo" element={<Todos />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;