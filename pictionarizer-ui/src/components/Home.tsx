import React from 'react';
import axios from 'axios'
import Word from '../interfaces/Word.interface';
import User from '../interfaces/User.interface';
import Words from './Words';
import Users from './Users';

class Home extends React.Component{
  render(){
    return(
      <div>
        <Users/>
          <br/><hr></hr><br/>
        <Words/>
      </div>
    )
  }
}

export default Home; 