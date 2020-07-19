import React from 'react';
import { Link } from 'react-router-dom';
import { getLoginId, logout} from '../LoginLocalStorage';
import { API_URL, TEST_USER_ID } from '../Constants';

const loginState = Number(getLoginId());

class Header extends React.Component{
  
  render(){
    return(
      <div>
        <Link to={'/login'}>Login</Link> 
        &nbsp;
        <button onClick={() => logoutAndRefresh()}>Logout</button>
        &nbsp;
        <img src={ loginState > 0 ? 
          `${API_URL}/users/uploaded-image/${loginState}` : 
          `${API_URL}/users/uploaded-image/${TEST_USER_ID}`}
            alt="fetched img" 
            width="35"
            height="35"
        />
        <hr/>
      </div>
    )
  }
}

const logoutAndRefresh = () => {
  logout();
  window.location.reload(true);
}

export default Header; 