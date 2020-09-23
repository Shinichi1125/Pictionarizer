import React from 'react';
import User from '../interfaces/User.interface';
import Word from '../interfaces/Word.interface';
import LoginInfo from '../interfaces/LoginInfo.interface';
import UsersDataService from '../api/UsersDataService';
import IUserProps from '../interfaces/IUserProps.interface';
import IUserState from '../interfaces/IUserState.interface';
import { API_URL, SMALL_INPUT_FIELD } from '../Constants';
import { Formik, Form, Field, ErrorMessage } from 'formik'; 
import { setLoginId } from '../LoginLocalStorage';

class DeleteUser extends React.Component<IUserProps, IUserState>{

  public static defaultProps: IUserProps = {
    history: undefined,
    location: undefined,
    match: undefined
  };  

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
      followings: 0,
      followers: 0,
      isFollowing: false,
      isFollowed: false,
      words: new Array<Word>()
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.cancelDelete = this.cancelDelete.bind(this)
    this.validate = this.validate.bind(this)
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

  validate(values: LoginInfo){
    let errors: Partial<LoginInfo> = {};
    if(values.email !== this.state.userData.email){
      errors.email = "⚠️You didn't provide the correct email address⚠️"
    }
    if(values.password !== this.state.userData.password){
      errors.password = "⚠️You didn't provide the correct password⚠️"
    }
    return errors; 
  }

  onSubmit(values: LoginInfo){
    UsersDataService.userLogin(values)
    .then(res =>{
      UsersDataService.deleteUser(res.data)
    })
    .then(() => this.props.history.push('/'))  
    .then(() => setLoginId(String(0)))  
    .then(() => window.location.reload(true))   
  }

  cancelDelete(id: number){
    this.props.history.push('/user/details/' + id)
  }
  
  render(){
    let id = Number(this.state.userId);
    let userName = this.state.userData.name;
    let email = '';
    let password = '';

    return(
      <div className="object-details">
        <h3>Are you sure you want to delete <span className="yellow-highlight">"{userName}"</span>?</h3>
        <img src={`${API_URL}/user/uploaded-image/${id}`} 
               alt="fetched img" 
               className="extra-large round-border"
          />
        <br></br>
        <br></br>
        <div>
          <Formik
            initialValues={{ email, password }}
            onSubmit={this.onSubmit}
            validate={this.validate}
            enableReinitialize={true}
          >
            {
              (props) => (
                <Form>
                  <ErrorMessage name="email" component="div" className="text-danger"/>
                  <fieldset className="form-group">
                    <Field type="text" name="email" placeholder="Confirm email address" size={SMALL_INPUT_FIELD}/>
                  </fieldset>
                  <ErrorMessage name="password" component="div" className="text-danger"/>
                  <fieldset className="form-group">
                    <Field type="password" name="password"
                      placeholder="Confirm password" size={SMALL_INPUT_FIELD}
                    />
                  </fieldset>                  
                  <button className="btn btn-secondary" onClick={() => this.cancelDelete(Number(this.state.userId))}>Cancel</button>&nbsp;&nbsp;
                  <button type="submit" className="btn btn-danger">Delete</button>             
                </Form>
              )
            }      
          </Formik>
        </div> 
      </div>
    )
  }
}

export default DeleteUser; 