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

    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount(){
    // directly mutating the state. to be refined later 
    this.state.userData.id = null; 
  }

  onSubmit(values: User){
    let user = values;

    UsersDataService.createUser(user)
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
                    <label>Description</label>&nbsp;
                    <Field type="text" size="75" name="description"/>
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