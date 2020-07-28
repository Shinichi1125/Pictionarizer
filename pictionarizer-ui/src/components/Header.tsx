import React from 'react';
import { Link } from 'react-router-dom';
import { getLoginId, logout} from '../LoginLocalStorage';
import { API_URL, TEST_USER_ID } from '../Constants';

const loginState = Number(getLoginId());

class Header extends React.Component{
  
  render(){
    return(
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <ul className="navbar-nav">
            <li className="nav-link">{loginState === 0?<Link to={'user/create'}>Sign up</Link>: <span></span>}</li>
            <li className="nav-link">{loginState === 0?<Link to={'/login'}>Log in</Link>: <span></span>}</li>
            <li>{loginState !== 0?<button onClick={() => logoutAndRefresh()}>Log out</button>: <span></span>}</li>
            <li><img src={ loginState > 0 ? 
              `${API_URL}/user/uploaded-image/${loginState}` : 
              `${API_URL}/user/uploaded-image/${TEST_USER_ID}`}
                alt="fetched img" 
                width="35"
                height="35"
            /></li>
            <li className="nav-link">{loginState !== 0?<Link to={'user/details/' + loginState}>My page</Link>: <p> </p>}</li>
          </ul>
        </nav>
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