import React from 'react';
import User from '../interfaces/User.interface';
import UsersDataService from '../api/UsersDataService';
import { Formik, Form, Field, ErrorMessage } from 'formik'; 
import IUserProps from '../interfaces/IUserProps.interface';
import IUserState from '../interfaces/IUserState.interface';

class SingleUser extends React.Component<IUserProps, IUserState>{
  
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
        imageUrl: '',
        description: '' 
      }
    }

    this.onSubmit = this.onSubmit.bind(this)
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

  onSubmit(values: User){
    let user = values;
    let id = user.id;
    
    UsersDataService.updateUser(id, user)
      .then(() => this.props.history.push('/'))   
  }

  render(){
    let { id, name, ownLanguage, 
      targetLanguage, country, email, 
      password, imageUrl, description} 
      = this.state.userData; 

    return(
      <div>
        <h2>User Info</h2>
        <div>
          <Formik
            initialValues={{ id, name, ownLanguage, targetLanguage, 
              country, email, password, imageUrl, description}}
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

export default SingleUser; 