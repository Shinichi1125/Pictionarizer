import React from 'react';
import axios from 'axios'
import User from '../interfaces/User.interface';
import UsersDataService from '../api/UsersDataService'

class Users extends React.Component{
  state = {
    usersData:new Array<User>()
  }

  componentWillMount(){
    //axios.get('http://localhost:8080/pictionarizerservices/api/users')
    UsersDataService.retrieveAllUsers()
    .then(response => {
      const info = response.data;
      this.setState({
        usersData:[...this.state.usersData, ...info]
      })
    })
  }

  render(){
    return(
      <div>
        <h2>Users:</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Own Lang</th>
              <th>Target Lang</th>
              <th>Country</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {this.state.usersData.map((user)=>
            <UserRowCreator 
              key = {user.id}
              id={user.id}
              name={user.name}
              ownLanguage={user.ownLanguage}
              targetLanguage={user.targetLanguage}
              email={user.email}
              password={user.password}
              country={user.country}
              description={user.description}
            />)}
          </tbody>
        </table>
      </div>
    )
  }
}

class UserRowCreator extends React.Component<User>{
  render(){
    let user = this.props;
    return(
        <tr>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.ownLanguage}</td>
          <td>{user.targetLanguage}</td>
          <td>{user.country}</td>
          <td>{user.description}</td>
          <td><button>Edit</button></td>
          
        </tr>
    )
  }
}

export default Users; 