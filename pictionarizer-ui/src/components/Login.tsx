import React from 'react';
import LoginInfo from '../interfaces/LoginInfo.interface';
import UsersDataService from '../api/UsersDataService'; 
import { Formik, Form, Field, ErrorMessage } from 'formik'; 
import ILoginInfoProps from '../interfaces/ILoginInfoProps.interface';
import ILoginInfoState from '../interfaces/ILoginInfoState.interface';
import { setLoginId } from '../LoginLocalStorage';
import { EASY_EMAIL_ADDRESS, EASY_PASSWORD } from '../Constants';

class Login extends React.Component<ILoginInfoProps, ILoginInfoState>{

  constructor(props: ILoginInfoProps){
    super(props)

    this.state = {
      loginId: '0',
      loginData: {
        email: '',
        password: ''
      }
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.validate = this.validate.bind(this)
    this.easyLogin = this.easyLogin.bind(this)
  }

  easyLogin(){
    let values: LoginInfo;
    values = {
      email: EASY_EMAIL_ADDRESS,
      password: EASY_PASSWORD
    }
    UsersDataService.userLogin(values)
    .then(res =>{
      setLoginId(String(res.data));
    })
    .then(() => this.props.history.push('/'))
    .then(() => window.location.reload(true))
  }

  validate(values: LoginInfo){
    let errors: Partial<LoginInfo> = {};
    if(values.email === ''){
      errors.email = 'Enter your email address'
    }
    if(values.password.length < 8){
      errors.password = 'Enter at least 8 characters for your password'
    }
    if(values.email === "The email address and the password don't match" && values.password === ''){
      errors.email = "The email address and the password don't match"
    }
    return errors; 
  }

  onSubmit(values: LoginInfo){
    UsersDataService.userLogin(values)
    .then(res =>{
      setLoginId(String(res.data));
    })
    .then(() => this.props.history.push('/'))
    .then(() => window.location.reload(true)) 
    .catch((error) => {
      console.log(error.response.data.message);
      values.email = error.response.data.message;
      values.password = '';
      this.validate(values);
   })
  }

  render(){
    let {email, password} = this.state.loginData;

    return(
      <div>
        <h2>Enter Login Info</h2>
        <div>
          <Formik
            initialValues = {{ email, password}}
            onSubmit = {this.onSubmit}
            validate={this.validate}
            enableReinitialize={true}
          >
            {
              (props) => (
                <Form>
                  <ErrorMessage name="email" component="div"/>
                  <fieldset>
                    <label>Email: </label>&nbsp;
                    <Field type="text" name="email"/>
                  </fieldset>
                  <ErrorMessage name="password" component="div"/>
                  <fieldset>
                    <label>Password: </label>&nbsp;
                    <Field type="text" name="password"/>
                  </fieldset>
                  <button type="submit">Send</button>
                </Form>
              )
            }
          </Formik>
          <br></br>
          <button type="button" 
                  className="btn btn-success" 
                  onClick={() => this.easyLogin()}
          >Easy Log in</button>
        </div>
      </div>
    )
  }
}

/*<ErrorMessage name="email" component="div"/> */
/* <ErrorMessage name="password" component="div"/>*/

export default Login; 