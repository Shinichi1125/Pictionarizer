import React from 'react';
import User from '../interfaces/User.interface';
import Word from '../interfaces/Word.interface';
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
      },
      words: new Array<Word>()
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

  cancelDelete(id: number){
    this.props.history.push('/user/details/' + id)
  }
  
  render(){
    let id = Number(this.state.userId);
    let userName = this.state.userData.name;

    return(
      <div className="object-details">
        <h3>Are you sure you want to delete <span className="yellow-highlight">"{userName}"</span>?</h3>
        <img src={`${API_URL}/user/uploaded-image/${id}`} 
               alt="fetched img" 
               className="extra-large round-border"
          />
        <br></br>
        <br></br>
        <button className="btn btn-secondary" onClick={() => this.cancelDelete(id)}>Cancel</button>&nbsp;&nbsp;
        <button className="btn btn-danger" onClick={() => this.confirmDelete(id)}>Delete</button> 
      </div>
    )
  }
}

export default DeleteUser; 