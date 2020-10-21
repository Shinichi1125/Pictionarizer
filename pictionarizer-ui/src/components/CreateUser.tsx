import React from 'react';
import User from '../interfaces/User.interface';
import Word from '../interfaces/Word.interface';
import Footer from './Footer';
import UsersDataService from '../api/UsersDataService';
import { Formik, Form, Field, ErrorMessage } from 'formik'; 
import IUserProps from '../interfaces/IUserProps.interface';
import IUserState from '../interfaces/IUserState.interface';
import { SMALL_INPUT_FIELD } from '../Constants';
import { setLoginId, getLoginId } from '../LoginLocalStorage';

class CreateUser extends React.Component<IUserProps, IUserState>{

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
    this.onChange = this.onChange.bind(this)
    this.validate = this.validate.bind(this)
    this.cancelCreate = this.cancelCreate.bind(this)
  }

  cancelCreate(){
    this.props.history.push('/')
  }

  validate(values: User){
    let errors = UsersDataService.formValidate(values);
    return errors; 
  }

  onChange(e: { currentTarget: HTMLInputElement; }){
    const chosenFile = e.currentTarget.files[0];
    let tempUserData = this.state.userData;
    tempUserData.image = chosenFile;  
    console.log("Content of tempUserData: ");
    console.log(tempUserData);
    this.setState({userData:tempUserData});
  }  

  async onSubmit(values: User){
    let user = {
      ...values, 
      image: this.state.userData.image, 
      id: this.state.userData.id
    };

    // If no file is selected, assign null   
    // so that the backend will set the default profile picture
    // (the backend will do so only when the "image" field is null)
    if(user.image.name === 'foo.txt'){
      user.image = null;
    }

    let loginInput = {
      email: user.email,
      password: user.password
    }

    await UsersDataService.createUser(user)
    .then(() => UsersDataService.userLogin(loginInput))
    .then(res => {
      setLoginId(String(res.data.userId));
      //alert("LoginId: " + getLoginId());
    }) 
    .then(() => this.props.history.push('/'))   
    .then(() => window.location.reload(true))    
  }
  
  render(){
    let init: User = { id: null, name: '', ownLanguage: '', 
      targetLanguage: '', country: '', email: '', 
      password: '', image: null, description: ''} 

    return(
      <div>
      <div className="object-details">
        <h2>Create an account</h2>
        <div>
          <Formik
            initialValues={init}
            onSubmit={this.onSubmit}
            validate={this.validate}
            enableReinitialize={true}
          >
            {
              (props) => (
                <Form>
                  <ErrorMessage name="name" component="div" className="text-danger"/>
                  <fieldset className="form-group">
                    <Field type="text" name="name"
                      placeholder="Your name" size={SMALL_INPUT_FIELD}
                    />
                  </fieldset>
                  <ErrorMessage name="targetLanguage" component="div" className="text-danger"/>
                  <fieldset className="form-group">
                    <Field type="text" name="targetLanguage"
                      placeholder="Your target language" size={SMALL_INPUT_FIELD}
                    />
                  </fieldset>
                  <ErrorMessage name="ownLanguage" component="div" className="text-danger"/>
                  <fieldset className="form-group">
                    <Field type="text" name="ownLanguage"
                      placeholder="Your own language" size={SMALL_INPUT_FIELD}
                    />
                  </fieldset>                 
                  <fieldset className="form-group">
                    <Field type="text" name="country"
                      placeholder="Your country" size={SMALL_INPUT_FIELD}
                    />
                  </fieldset>
                
                  <ErrorMessage name="email" component="div" className="text-danger"/>
                  <fieldset className="form-group">
                    <Field type="text" name="email"
                      placeholder="Your email address" size={SMALL_INPUT_FIELD}
                    />
                  </fieldset>
                  <ErrorMessage name="password" component="div" className="text-danger"/>
                  <fieldset className="form-group">
                    <Field type="password" name="password"
                      placeholder="Password" size={SMALL_INPUT_FIELD}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <Field as="textarea" name="description"
                      placeholder="Describe who you are, or just write whatever on your mind" 
                      cols="60" rows="2"
                    />
                  </fieldset>      
                  <fieldset className="custom-file" >                   
                    <input className="custom-file-input" id="customFile" type="file" name="image" onChange={this.onChange}/>
                    <label className="custom-file-label half-width-in-form" >
                    {this.state.userData.image.name === 'foo.txt'? 'Choose file': this.state.userData.image.name}
                    </label>
                  </fieldset>
                  <br/><br/>
                  <button className="btn btn-secondary" onClick={() => this.cancelCreate()}>Cancel</button>&nbsp;
                  <button type="submit" className="btn btn-primary">Sign up</button>              
                </Form>
              )
            }      
          </Formik>
        </div>
      </div>
      <Footer/>
      </div>
    )
  }
}

export default CreateUser; 