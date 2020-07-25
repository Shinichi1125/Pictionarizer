import React from 'react';
import User from '../interfaces/User.interface';
import UsersDataService from '../api/UsersDataService';
import { Formik, Form, Field, ErrorMessage } from 'formik'; 
import IUserProps from '../interfaces/IUserProps.interface';
import IUserState from '../interfaces/IUserState.interface';
import { API_URL } from '../Constants';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure();

class UpdateUser extends React.Component<IUserProps, IUserState>{
  
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

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
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

  validate(values: User){
    let errors = UsersDataService.formValidate(values);
    return errors; 
  }

  // gets invoked when "choose file" button is clicked and a file is chosen
  onChange(e: { currentTarget: HTMLInputElement; }){
    const chosenFile = e.currentTarget.files[0];
    let tempUserData = this.state.userData;
    tempUserData.image = chosenFile;  
    this.setState({userData:tempUserData});
  }  

  // An image file is fetched from the state, 
  // whereas the rest come from the Formik form.
  // The state and the form get merged and sent 
  // as an axios request in the UsersDataService
  async onSubmit(values: User){
    let user = {
      ...values,
      image:this.state.userData.image
    };
    let id = Number(this.state.userId);

    await UsersDataService.updateUser(id, user)
    .then(() => UsersDataService.updateToast("User"))    
    .then(() => this.props.history.push('/users'))
    .then(() => window.location.reload(true))   
  }

  render(){
    let { id, name, ownLanguage, 
      targetLanguage, country, email, 
      password, image, description} 
      = this.state.userData; 

    return(
      <div>
        <h2>Update User</h2>
        <img src={`${API_URL}/user/uploaded-image/${this.state.userId}`} 
               alt="fetched img" 
               width="150"
               height="150"
          />
        <br></br>
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
                  <ErrorMessage name="name" component="div"/>
                  <fieldset>
                    <label>Name</label>&nbsp;
                    <Field type="text" name="name"/>
                  </fieldset>
                  <ErrorMessage name="ownLanguage" component="div"/>
                  <fieldset>
                    <label>Own Language</label>&nbsp;
                    <Field type="text" name="ownLanguage"/>
                  </fieldset>
                  <ErrorMessage name="targetLanguage" component="div"/>
                  <fieldset>
                    <label>Target Language</label>&nbsp;
                    <Field type="text" name="targetLanguage"/>
                  </fieldset>
                  <fieldset>
                    <label>Country</label>&nbsp;
                    <Field type="text" name="country"/>
                  </fieldset>
                  <ErrorMessage name="email" component="div"/>
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

export default UpdateUser; 