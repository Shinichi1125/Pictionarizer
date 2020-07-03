import React from 'react';
import User from '../interfaces/User.interface';
import UsersDataService from '../api/UsersDataService';
import IUserProps from '../interfaces/IUserProps.interface';
import IUserState from '../interfaces/IUserState.interface';

class DeleteUser extends React.Component<IUserProps, IUserState>{

  constructor(props: IUserProps){
    super(props)

    this.state = {
      userId: this.props.match.params.id,
      userData: {
        id: 0,
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
    .then(() => this.props.history.push('/'))       
  }

  cancelDelete(){
    this.props.history.push('/')
  }
  
  render(){
    let id = Number(this.state.userId);
    let userName = this.state.userData.name;

    return(
      <div>
        <h2>Are you sure you want to delete "{userName}"?</h2>
        <button onClick={() => this.confirmDelete(id)}>Yes</button>&nbsp;
        <button onClick={() => this.cancelDelete()}>No</button>
      </div>
    )
  }
}

export default DeleteUser; 