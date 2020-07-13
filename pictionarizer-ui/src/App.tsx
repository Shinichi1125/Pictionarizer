import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Words from './components/Words';
import Users from './components/Users';
import UpdateUser from './components/UpdateUser';
import CreateUser from './components/CreateUser';
import DeleteUser from './components/DeleteUser';
import UpdateWord from './components/UpdateWord';
import CreateWord from './components/CreateWord';
import DeleteWord from './components/DeleteWord';
import WordDetails from './components/WordDetails';
import UserDetails from './components/UserDetails';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/words" component={Words}/>
        <Route exact path="/users" component={Users}/>
        <Route exact path="/users/create" component={CreateUser}/>
        <Route exact path="/users/delete/:id" component={DeleteUser}/>
        <Route exact path="/users/details/:id" component={UserDetails}/>
        <Route exact path="/users/:id" component={UpdateUser}/>
        <Route exact path="/words/create" component={CreateWord}/>
        <Route exact path="/words/:id" component={UpdateWord}/>
        <Route exact path="/words/delete/:id" component={DeleteWord}/>
        <Route exact path="/words/details/:id" component={WordDetails}/>
             
      </Switch>
    </div>
  );
}

export default App;
