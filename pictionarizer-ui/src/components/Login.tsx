import React from 'react';
import LoginInfo from '../interfaces/LoginInfo.interface';
import UsersDataService from '../api/UsersDataService'; 
import { Formik, Form, Field, ErrorMessage, FormikBag, FormikHelpers } from 'formik'; 
import ILoginInfoProps from '../interfaces/ILoginInfoProps.interface';
import ILoginInfoState from '../interfaces/ILoginInfoState.interface';
import { setLoginId } from '../LoginLocalStorage';
import { EASY_EMAIL_ADDRESS, EASY_PASSWORD } from '../Constants';

class Login extends React.Component<ILoginInfoProps, ILoginInfoState>{

  public static defaultProps: ILoginInfoProps = {
    id: '24',
    history: undefined,
    location: undefined,
    match: undefined
  };  

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
      errors.email = '⚠️Enter your email address⚠️'
    }
    if(values.password.length < 8){
      errors.password = '⚠️Enter at least 8 characters for your password⚠️'
    }
    return errors; 
  }

  onSubmit(values: LoginInfo, formikBag: FormikHelpers<LoginInfo>){
    UsersDataService.userLogin(values)
    .then(res =>{
      console.log("res contents: ");
      console.log(res);
      setLoginId(String(res.data));
    })
    .then(() => this.props.history.push('/'))
    .then(() => window.location.reload(true)) 
    .catch((error) => {
      console.log(error.response.data.message);
      formikBag.setErrors({
        email: error.response.data.message,
        password: ''
      })  
   })
  }

  render(){
    let {email, password} = this.state.loginData;

    return(
      <div className="object-details">
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
                  <ErrorMessage name="email" component="div" className="text-danger"/>
                  <div className="form-group">
                  <fieldset>
                    <Field type="text" name="email" placeholder="📧Email" size="35"/>
                  </fieldset>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-danger"/>
                  <div className="form-group">
                  <fieldset>
                    <Field type="text" name="password" placeholder="🔑Password" size="35"/>
                  </fieldset>
                  </div>
                  <button type="submit" className="btn btn-primary">Log in</button>
                </Form>
              )
            }
          </Formik>
          <small id="easyLoginHelpBlock" className="form-text text-muted">
            You can log in as Test User just by clicking the "Easy Log in" button below.
          </small>
          <div><strong>↓</strong></div>
          <button type="button" 
                  className="btn btn-success" 
                  onClick={() => this.easyLogin()}
          ><span role="img" aria-label="light bulb">💡</span>Easy Log in</button>
        </div>
      </div>
    )
  }
}

export default Login; 