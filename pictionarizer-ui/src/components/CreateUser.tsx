import React from 'react';
import User from '../interfaces/User.interface';
import UsersDataService from '../api/UsersDataService';
import { Formik, Form, Field, ErrorMessage } from 'formik'; 
import IUserProps from '../interfaces/IUserProps.interface';
import IUserState from '../interfaces/IUserState.interface';

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
        image: null,
        description: '' 
      }
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.validate = this.validate.bind(this)
  }

  validate(Values: User){
    let errors: Partial<User> = {};
    if(Values.password.length < 8){
      errors.password = 'Enter at least 8 characters for your password'
    }

    console.log("The length of errors.password: " + Values.password.length);

    return errors;
  }

  onChange(e: { currentTarget: HTMLInputElement; }){
    const chosenFile = e.currentTarget.files[0];
    console.log("The value of chosenFile:");
    console.log(chosenFile);

    let tempUserData = this.state.userData;
    tempUserData.image = chosenFile;  

    this.setState({userData:tempUserData});
    console.log("The value of this.state.wordData: ");
    console.log(this.state.userData);
  }  

  async onSubmit(values: User){
    let user = {
      ...values, 
      image: this.state.userData.image, 
      id: this.state.userData.id
    };

    await UsersDataService.createUser(user)
    .then(() => this.props.history.push('/'))       
  }
  
  render(){
    let { id, name, ownLanguage, 
      targetLanguage, country, email, 
      password, image, description} 
      = this.state.userData; 

    return(
      <div>
        <h2>Create User</h2>
        <div>
          <Formik
            initialValues={{ id, name, ownLanguage, targetLanguage, 
              country, email, password, image, description}}
            onSubmit={this.onSubmit}
            validate={this.validate}
            enableReinitialize={true}
          >
            {
              (props) => (
                <Form>
                  <fieldset>
                    <label>Name</label>&nbsp;
                    <Field type="text" name="name"/>
                  </fieldset>
                  <fieldset>
                    <label>Own Language</label>&nbsp;
                    <Field type="text" name="ownLanguage"/>
                  </fieldset>
                  <fieldset>
                    <label>Target Language</label>&nbsp;
                    <Field type="text" name="targetLanguage"/>
                  </fieldset>
                  <fieldset>
                    <label>Country</label>&nbsp;
                    <Field type="text" name="country"/>
                  </fieldset>
                  <fieldset>
                    <label>Email</label>&nbsp;
                    <Field type="text" name="email"/>
                  </fieldset> 
                  <ErrorMessage name="password" component="div"/>
                  <fieldset>
                    <label>Password</label>&nbsp;
                    <Field type="password" name="password"/>
                  </fieldset>
                  <fieldset>
                    <label>Description</label>&nbsp;
                    <Field type="text" size="75" name="description"/>
                  </fieldset>
                  <fieldset>
                    <label>Image</label>&nbsp;
                    <input id="image" type="file" name="image" onChange={this.onChange}/>
                  </fieldset>
                  <button type="submit">Save</button>
                </Form>
              )
            }      
          </Formik>
        </div>
      </div>
    )
  }
}

export default CreateUser; 