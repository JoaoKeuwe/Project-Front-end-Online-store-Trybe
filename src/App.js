import React from 'react';
import { BrowserRouter as BrowseRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Search from './components/Search';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  return (
    <div>
      <BrowseRouter>
        <Switch>
          <Route exact path="/" component={ Search } />
          <Route exact path="/ShoppingCart" component={ ShoppingCart } />
        </Switch>
      </BrowseRouter>
    </div>
  );
}

export default App;
