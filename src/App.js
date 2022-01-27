import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import CategList from './components/CategList';

function App() {
  return (
    <div>
      <BrowserRouter>
        <CategList />
        <Home />
      </BrowserRouter>
    </div>
  );
}

export default App;
