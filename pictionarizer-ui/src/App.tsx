import React from 'react';
import './App.css';
import './bootstrap.css';

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
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Follower from './components/Follower';
import Following from './components/Following';
import Likes from './components/Likes';

function App() {
  return (
    <div className="App">
      <Header/>
      <br/><br/><br/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/words" component={Words}/>
        <Route exact path="/users" component={Users}/>
        <Route exact path="/user/create" component={CreateUser}/>
        <Route exact path="/user/delete/:id" component={DeleteUser}/>
        <Route exact path="/user/details/:id" component={UserDetails}/>
        <Route exact path="/user/followers/:id" component={Follower}/>
        <Route exact path="/user/followings/:id" component={Following}/>
        <Route exact path="/user/:id" component={UpdateUser}/>
        <Route exact path="/word/create" component={CreateWord}/>
        <Route exact path="/word/:id" component={UpdateWord}/>
        <Route exact path="/word/delete/:id" component={DeleteWord}/>
        <Route exact path="/word/details/:id" component={WordDetails}/>
        <Route exact path="/word/likes/:id" component={Likes}/>    
        <Route exact path="/login" component={Login}/>          
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
