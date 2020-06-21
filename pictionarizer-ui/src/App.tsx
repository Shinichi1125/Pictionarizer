import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Words from './components/Words';
import Users from './components/Users';
import UpdateUser from './components/UpdateUser';
import CreateUser from './components/CreateUser';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/words" component={Words}/>
        <Route exact path="/users" component={Users}/>
        <Route exact path="/users/create" component={CreateUser}/>
        <Route exact path="/users/:id" component={UpdateUser}/>
        
        
      </Switch>
    </div>
  );
}

export default App;
