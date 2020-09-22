import React from 'react';
import User from '../interfaces/User.interface';
import { API_URL } from '../Constants';
import { Link } from 'react-router-dom';

class UserRowCreator extends React.Component<User>{

  render(){
    let user = this.props;

    return(
        <div className="user-row">          
          <img src={`${API_URL}/user/uploaded-image/${user.id}`} 
              alt="fetched img" 
              className="row-image"
          />        
          <h5>
            <Link to={'/user/details/' + String(user.id)}>{user.name}</Link>
          </h5>   
          <p>
            {user.description}
          </p>           
        </div>
    )
  }
}

export default UserRowCreator; 