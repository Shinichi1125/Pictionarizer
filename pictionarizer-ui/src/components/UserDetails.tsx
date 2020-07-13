import React from 'react';
import User from '../interfaces/User.interface';
import UsersDataService from '../api/UsersDataService'; 
import IUserProps from '../interfaces/IUserProps.interface';
import IUserState from '../interfaces/IUserState.interface';
import { API_URL } from '../Constants';
import { Link } from 'react-router-dom';

class UserDetails extends React.Component<IUserProps, IUserState>{
  
  constructor(props: IUserProps){
    super(props)

    this.state = {
      userId: this.props.match.params.id,
      userData: {
        id: null,
        name: '',
        ownLanguage: '',
        targetLanguage: '',
        country: '',
        email: '',
        password: '',
        image: null,
        description: '' 
      }
    }
  }

  componentDidMount(){
    let id = Number(this.props.match.params.id);
    let data: User;

    UsersDataService.retrieveUser(id)
    .then(res => {
      data = res.data;
      this.setState({userData:data});
    }) 
  }

  render(){
    let { id, name, ownLanguage, 
      targetLanguage, country, email, 
      password, image, description} 
      = this.state.userData; 

    return(
      <div>
        <h2>User Details</h2>
        <img src={`${API_URL}/users/uploaded-image/${id}`} 
               alt="fetched img" 
               width="150"
               height="150"
        />
        <br></br>
        <div>Name: {name}</div>
        <div>Target Language: {targetLanguage}</div>
        <div>Own Language: {ownLanguage}</div>
        <div>Country: {country}</div>
        <div>Description: {description}</div>        
        <div><Link to={'/users/' + String(id)}>Edit</Link></div>  
        <div><Link to={'/users/delete/' + String(id)}>Delete</Link></div>
      </div>
    )
  }
}

export default UserDetails; 