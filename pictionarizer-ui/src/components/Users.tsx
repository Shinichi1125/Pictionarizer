import React from 'react';
import User from '../interfaces/User.interface';
import UsersDataService from '../api/UsersDataService';
import { Link } from 'react-router-dom';
import { API_URL } from '../Constants';

class Users extends React.Component{

  state = {
    usersData:new Array<User>()
  }

  componentDidMount(){
    UsersDataService.retrieveAllUsers()
    .then(response => {
      const info = response.data;
      this.setState({
        usersData:[...this.state.usersData, ...info]
      })
    })
  }

  deleteUserClicked(id: number){
    UsersDataService.deleteUser(id)
  }

  render(){
    return(
      <div>
        <br/><hr></hr><br/>
        <Link to={'/words'}>Words</Link>
        <br/><hr></hr><br/>
        <Link to={'users/create'}>+User</Link>
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
              <th>Avatar</th>
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
          <td>
            <img src={`${API_URL}/users/uploaded-image/${user.id}`} 
                alt="fetched img" 
                width="75"
                height="75"
            />
          </td>
          <td><Link to={'users/details/' + String(user.id)}>Details</Link></td> 
        </tr>
    )
  }
}

export default Users; 