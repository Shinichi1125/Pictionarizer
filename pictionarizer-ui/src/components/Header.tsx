import React from 'react';
import { Link } from 'react-router-dom';
import { getLoginId, logout} from '../LoginLocalStorage';
import { API_URL, TEST_USER_ID } from '../Constants';

const loginState = Number(getLoginId());

class Header extends React.Component{
  
  render(){
    return(
      <div>
        {loginState === 0?<Link to={'user/create'}>Sign up</Link>: <span></span>}
        &nbsp;&nbsp;
        {loginState === 0?<Link to={'/login'}>Log in</Link>: <span></span>}
        &nbsp;&nbsp;
        {loginState !== 0?<button onClick={() => logoutAndRefresh()}>Logout</button>: <span></span>}
        &nbsp;&nbsp;
        <img src={ loginState > 0 ? 
          `${API_URL}/user/uploaded-image/${loginState}` : 
          `${API_URL}/user/uploaded-image/${TEST_USER_ID}`}
            alt="fetched img" 
            width="35"
            height="35"
        />
        &nbsp;&nbsp;
        {loginState !== 0?<Link to={'user/details/' + loginState}>Profile</Link>: <p> </p>}
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