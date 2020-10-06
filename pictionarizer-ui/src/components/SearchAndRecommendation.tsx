import React from 'react';
import User from '../interfaces/User.interface';
import UsersDataService from '../api/UsersDataService'; 
import { getLoginId } from '../LoginLocalStorage';
import AsideUserRow from './AsideUserRow';

const loginState = Number(getLoginId());

class SearchAndRecommendation extends React.Component{

  state = {
    users: new Array<User>()
  }

  componentDidMount(){
    let id = loginState;

    if(id > 0){
      UsersDataService.retrieveRecommendation(id)
      .then(res => {
        this.setState({
          users:[...this.state.users, ...res.data]
        })
      }) 
    } else {
      UsersDataService.retrieveRandomUsers()
      .then(res => {
        this.setState({
          users:[...this.state.users, ...res.data]
        })
      }) 
    }
  }

  render(){
    return(
      <div>
        <div className="active-cyan-3 active-cyan-4 mb-4 flex">
          <input className="form-control" type="text" placeholder="🔍Keywords" aria-label="Search"/>
          <button className="action-button primary" type="submit">Search</button>
        </div>
        <h5>Account recommendation</h5>
          {this.state.users.map((user)=>
            <AsideUserRow 
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

export default SearchAndRecommendation; 