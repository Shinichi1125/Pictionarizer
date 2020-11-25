import React from 'react';
import { Link } from 'react-router-dom';
import { getLoginId, logout} from '../LoginLocalStorage';
import { API_URL, TEST_USER_ID, LOGO_ID } from '../Constants';

const loginState = Number(getLoginId());

class Header extends React.Component{
  
  render(){
    return(
      <div className="Header">
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <ul className="navbar-nav navbar-collapse">
            <li>
              <img src={`${API_URL}/user/uploaded-image/${LOGO_ID}`}
                alt="fetched img" 
                className="logo-size"
              />
            </li>
            &nbsp;
            <li title="Jump to the top page"><Link className="website-title" to={'/'}>Pictionarizer</Link></li>
          </ul>
          <ul className="navbar-nav navbar-collapse justify-content-end">
            <li className="nav-link">{loginState === 0?<Link to={'user/create'}><span role="img" aria-label="sign up">📑</span>Sign up</Link>: <span></span>}</li>
            <li className="nav-link">{loginState === 0?<Link to={'/login'}><span role="img" aria-label="log in">📥</span>Log in</Link>: <span></span>}</li>
            <li>{loginState !== 0? <button onClick={() => logoutAndRefresh()}><span role="img" aria-label="log out">📤</span>Log out</button>: <span></span>}</li>
            &nbsp;
            <li>
              <img src={ loginState > 0 ? 
              `${API_URL}/user/uploaded-image/${loginState}` : 
              `${API_URL}/user/uploaded-image/${TEST_USER_ID}`}
                alt="fetched img" 
                className="small round-border"
              />
            </li>
            &nbsp;
            <li className="nav-link">{loginState !== 0?<Link to={'/user/details/' + loginState}>My page</Link>: <p> </p>}</li>
          </ul>
        </nav>
      </div>
    )
  }
}

const logoutAndRefresh = () => {
  logout();
  window.location.reload(true);
}

export default Header; 