import React from 'react';
import { Link } from 'react-router-dom';
import { getLoginId, logout} from '../LoginLocalStorage';
import { API_URL, TEST_USER_ID } from '../Constants';

const loginState = Number(getLoginId());

class Header extends React.Component{
  
  render(){
    return(
      <div>
        {loginState === 0?<Link to={'user/create'}>Sign up</Link>: <p> </p>}
        &nbsp;&nbsp;
        <Link to={'/login'}>Log in</Link> 
        &nbsp;&nbsp;
        <button onClick={() => logoutAndRefresh()}>Logout</button>
        &nbsp;&nbsp;
        <img src={ loginState > 0 ? 
          `${API_URL}/user/uploaded-image/${loginState}` : 
          `${API_URL}/user/uploaded-image/${TEST_USER_ID}`}
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