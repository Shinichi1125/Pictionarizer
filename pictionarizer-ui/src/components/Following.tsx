import React from 'react';
import UsersDataService from '../api/UsersDataService'; 
import User from '../interfaces/User.interface';
import IFollowProps from '../interfaces/IFollowProps.interface';
import IFollowState from '../interfaces/IFollowState.interface';
import UserRowCreator from './UserRowCreator';
import { Link } from 'react-router-dom';

class Following extends React.Component<IFollowProps, IFollowState>{
  constructor(props: IFollowProps){
    super(props)

    this.state = {
      userId: this.props.match.params.id,
      userName: '',
      followers: new Array<User>(),
      followings: new Array<User>()
    }
  }

  componentDidMount(){
    let id = Number(this.props.match.params.id);

    UsersDataService.retrieveFollowings(id)
    .then(res => {
      this.setState({
        followings:[...this.state.followings, ...res.data]
      })
    }) 

    UsersDataService.getUserName(id)
    .then(res => {
      this.setState({userName:res.data});
    })
  }

  render(){
    return(
      <div>
        <h3><span className="yellow-highlight">&nbsp;{this.state.userName}&nbsp;</span></h3>
        <div className="follow-nav">
          <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
              <Link to={'/user/followers/' + String(this.state.userId)}>Followers</Link>
            </li>
            <li className="nav-item follow-nav-selected">
              <Link className="white-text" to={'/user/followings/' + String(this.state.userId)}>Following</Link>
            </li>
          </ul>
        </div>
          {this.state.followings.map((user)=>
            <UserRowCreator 
              key = {user.id}
              id={user.id}
              name={user.name}
              ownLanguage={user.ownLanguage}
              targetLanguage={user.targetLanguage}
              country={user.country}
              email={user.email}
              password={user.password}
              image={user.image}
              description={user.description}
            />)}
      </div>
    )
  }
}

export default Following; 
