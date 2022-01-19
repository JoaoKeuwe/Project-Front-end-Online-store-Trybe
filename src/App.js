import React from 'react';
import { BrowserRouter as BrowseRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Search from './components/Search';

function App() {
  return (
    <div>
      <BrowseRouter>
        <Switch>
          <Route exact path="/" component={ Search } />
        </Switch>
      </BrowseRouter>
    </div>
  );
}

export default App;
