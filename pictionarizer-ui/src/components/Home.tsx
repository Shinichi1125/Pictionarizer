import React from 'react';
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