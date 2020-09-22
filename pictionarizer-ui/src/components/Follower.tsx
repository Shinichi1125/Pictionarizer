import React from 'react';
import UsersDataService from '../api/UsersDataService'; 
import User from '../interfaces/User.interface';
import IFollowProps from '../interfaces/IFollowProps.interface';
import IFollowState from '../interfaces/IFollowState.interface';
import UserRowCreator from './UserRowCreator';

class Follower extends React.Component<IFollowProps, IFollowState>{
  constructor(props: IFollowProps){
    super(props)

    this.state = {
      userId: this.props.match.params.id,
      followers: new Array<User>(),
      followings: new Array<User>()
    }
  }

  componentDidMount(){
    let id = Number(this.props.match.params.id);

    UsersDataService.retrieveFollowers(id)
    .then(res => {
      this.setState({
        followers:[...this.state.followers, ...res.data]
      })
    }) 
  }

  render(){
    return(
      <div>
        <h3>【Followers】</h3>
          {this.state.followers.map((user)=>
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

export default Follower; 
