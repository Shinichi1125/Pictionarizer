import React from 'react';
import User from '../interfaces/User.interface';
import { API_URL } from '../Constants';
import { Link } from 'react-router-dom';
import { getLoginId } from '../LoginLocalStorage';
import UsersDataService from '../api/UsersDataService'; 

const loginState = Number(getLoginId());

class UserRowCreator extends React.Component<User>{

  state = {
    isFollowing: false,
    isFollowed: false
  }

  componentDidMount(){
    let id = this.props.id;

    const followerRelation = {
      userId: loginState,
      followerId: id,
      followeeId: loginState
    }

    const followingRelation = {
      userId: loginState,
      followerId: loginState,
      followeeId: id
    }

    UsersDataService.isFollowed(followerRelation)
    .then(res => {
      this.setState({isFollowed: res.data})
    })
    UsersDataService.isFollowing(followingRelation)
    .then(res => {
      this.setState({isFollowing: res.data})
    })
  }

  render(){
    let user = this.props;

    return(
        <div className="user-row">          
          <img src={`${API_URL}/user/uploaded-image/${user.id}`} 
              alt="fetched img" 
              className="user-row-image no-space-top-bottom"
          /> 

          <nav className="username-follow navbar-expand-md">   
            <ul className="navbar-nav navbar-collapse no-space-top-bottom">
              <li>
                <h5 className="no-space-top-bottom">
                  <Link to={'/user/details/' + String(user.id)}>{user.name}</Link>&nbsp;&nbsp;
                  {
                    this.state.isFollowed? 
                      <span className="small-font sky-background">
                        &nbsp;Follows you&nbsp;
                      </span>:
                    <span></span>
                  }
                </h5>   
              </li>   
            </ul>       
            <ul className="navbar-nav navbar-collapse justify-content-end no-space-top-bottom">
              <li>
                {
                  loginState === user.id? <span></span>:
                  this.state.isFollowing? 
                    <button 
                      onClick={() => unfollowUser(user.id)} 
                      className="btn btn-primary follow-button no-space-top-bottom">
                        Following
                    </button>:
                  <button 
                    onClick={() => followUser(user.id)} 
                    className="btn btn-outline-primary follow-button no-space-top-bottom">
                      Follow
                  </button>
                }  
              </li>
            </ul>    
          </nav>
                
          <p>
            {user.description}
          </p>           
        </div>
    )
  }
}

const followUser = (id: number) => {
  const followingRelation = {
    userId: loginState,
    followerId: loginState,
    followeeId: id
  }
  UsersDataService.followUser(followingRelation)
  .then(() => window.location.reload(true)) 
}

const unfollowUser = (id: number) => {
  const followingRelation = {
    userId: loginState,
    followerId: loginState,
    followeeId: id
  }
  UsersDataService.unfollowUser(followingRelation)
  .then(() => window.location.reload(true))
}

// nav-bar is sticking out to the right, so it should be fixed later

export default UserRowCreator; 