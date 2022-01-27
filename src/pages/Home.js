import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Search from '../components/Search';
import CategProducts from './CategProducts';
import './Home.css';
import ShoppingCart from './ShoppingCart';
import ProductPage from './ProductPage';
import Checkout from './Chechout';

export default class Home extends React.Component {
  render() {
    return (
      <main className="home">
        <Switch>
          <Route exact path="/" component={ Search } />
          <Route exact path="/categproducts/:id" component={ CategProducts } />
          <Route exact path="/shoppingcart" component={ ShoppingCart } />
          <Route exact path="/productPage/:id" component={ ProductPage } />
          <Route exact path="/checkout" component={ Checkout } />
        </Switch>
      </main>
    );
  }
}
