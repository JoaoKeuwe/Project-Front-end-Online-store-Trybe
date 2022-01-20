import React from 'react';
import { BrowserRouter as BrowseRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Search from './components/Search';
import ShoppingCart from './pages/ShoppingCart';
import CategProducts from './pages/CategProducts';

function App() {
  return (
    <div>
      <BrowseRouter>
        <Switch>
          <Route exact path="/" component={ Search } />
          <Route exact path="/shoppingcart" component={ ShoppingCart } />
          <Route exact path="/categproducts/:id" component={ CategProducts } />
        </Switch>
      </BrowseRouter>
    </div>
  );
}

export default App;
