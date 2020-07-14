import React from 'react';
import User from '../interfaces/User.interface';
import UsersDataService from '../api/UsersDataService';
import IUserProps from '../interfaces/IUserProps.interface';
import IUserState from '../interfaces/IUserState.interface';
import { API_URL } from '../Constants';

class DeleteUser extends React.Component<IUserProps, IUserState>{

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
        image: new File(["foo"], "foo.txt"),
        description: '' 
      }
    }

    this.confirmDelete = this.confirmDelete.bind(this)
    this.cancelDelete = this.cancelDelete.bind(this)
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

  confirmDelete(id: number){
    UsersDataService.deleteUser(id)
    .then(() => this.props.history.push('/users'))       
  }

  cancelDelete(id: number){
    this.props.history.push('/users/details/' + id)
  }
  
  render(){
    let id = Number(this.state.userId);
    let userName = this.state.userData.name;

    return(
      <div>
        <h2>Are you sure you want to delete "{userName}"?</h2>
        <img src={`${API_URL}/users/uploaded-image/${id}`} 
               alt="fetched img" 
               width="300"
               height="300"
          />
        <br></br>
        <button onClick={() => this.confirmDelete(id)}>Yes</button>&nbsp;&nbsp;
        <button onClick={() => this.cancelDelete(id)}>No</button>
      </div>
    )
  }
}

export default DeleteUser; 