import React from 'react';
import User from '../interfaces/User.interface';
import UsersDataService from '../api/UsersDataService'; 
import { getLoginId } from '../LoginLocalStorage';
import AsideUserRow from './AsideUserRow';
import { Link } from 'react-router-dom';

const loginState = Number(getLoginId());

class SearchAndRecommendation extends React.Component{

  state = {
    searchField: '',
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

  onHandleChange(event: { currentTarget: HTMLInputElement; }){
    this.setState({
      searchField: event.currentTarget.value
    });
  }

  render(){
    return(
      <div>
        <div className="active-cyan-3 active-cyan-4 mb-4 flex">
          <input className="form-control" 
                type="text" 
                placeholder="🔍Word or User Name" 
                aria-label="Search"
                value={this.state.searchField}
                onChange={(event) => this.onHandleChange(event)}
          />
          {
            this.state.searchField === ''?
            <button className="action-button outline-primary push-right">Search</button>:
            <Link className="action-button primary push-right" to={'/searched/' + this.state.searchField}>
              <span className="push-down">Search</span>
            </Link>
          }         
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
