import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Words from './components/Words';
import Users from './components/Users';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/words" component={Words}/>
        <Route exact path="/users" component={Users}/>
        
      </Switch>
    </div>
  );
}

export default App;
