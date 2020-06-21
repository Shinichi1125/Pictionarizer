import React from 'react';
import User from '../interfaces/User.interface';
import UsersDataService from '../api/UsersDataService';
import { Link } from 'react-router-dom';

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
        <button>+User</button>
        <br></br>
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
          <td><Link to={'users/' + String(user.id)}>Edit</Link></td>     
        </tr>
    )
  }
}

export default Users; 