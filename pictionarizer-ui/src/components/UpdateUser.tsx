import React from 'react';
import User from '../interfaces/User.interface';
import Word from '../interfaces/Word.interface';
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
      },
      words: new Array<Word>()
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.validate = this.validate.bind(this)
    this.cancelUpdate = this.cancelUpdate.bind(this)
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

  cancelUpdate(id: number){
    this.props.history.push('/user/details/' + id)
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
    .then(() => this.props.history.push('/user/details/' + String(id)))
    .then(() => window.location.reload(true))   
  }

  render(){
    let { id, name, ownLanguage, 
      targetLanguage, country, email, 
      password, image, description} 
      = this.state.userData; 

    return(
      <div className="object-details">
        <h2>Update User</h2>
        <img src={`${API_URL}/user/uploaded-image/${this.state.userId}`} 
               alt="fetched img" 
               className="large round-border"
          />
        <br></br>
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
                  <ErrorMessage name="name" component="div" className="text-danger"/>
                  <fieldset className="form-group">
                    <Field type="text" name="name"
                      placeholder="Your name" size="25"
                    />
                  </fieldset>
                  <ErrorMessage name="targetLanguage" component="div" className="text-danger"/>
                  <fieldset className="form-group">
                    <Field type="text" name="targetLanguage"
                      placeholder="Your target language" size="25"
                    />
                  </fieldset>
                  <ErrorMessage name="ownLanguage" component="div" className="text-danger"/>
                  <fieldset className="form-group">
                    <Field type="text" name="ownLanguage"
                      placeholder="Your own language" size="25"
                    />
                  </fieldset>                 
                  <fieldset className="form-group">
                    <Field type="text" name="country"
                      placeholder="Your country" size="25"
                    />
                  </fieldset>
                  <ErrorMessage name="email" component="div" className="text-danger"/>
                  <fieldset className="form-group">
                    <Field type="text" name="email"
                      placeholder="Your email address" size="25"
                    />
                  </fieldset>
                  <ErrorMessage name="password" component="div" className="text-danger"/>
                  <fieldset className="form-group">
                    <Field type="password" name="password"
                      placeholder="Password" size="25"
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <Field as="textarea" name="description"
                      placeholder="Describe who you are, or simply write whatever on your mind" 
                      cols="60" rows="2"
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input id="image" type="file" name="image" onChange={this.onChange}/>
                  </fieldset>
                  <button className="btn btn-secondary" onClick={() => this.cancelUpdate(id)}>Cancel</button>&nbsp;
                  <button type="submit" className="btn btn-primary">Save</button>              
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