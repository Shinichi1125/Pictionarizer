import React from 'react';
import LoginInfo from '../interfaces/LoginInfo.interface';
import Footer from './Footer';
import UsersDataService from '../api/UsersDataService'; 
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'; 
import ILoginInfoProps from '../interfaces/ILoginInfoProps.interface';
import ILoginInfoState from '../interfaces/ILoginInfoState.interface';
import { setLoginId } from '../LoginLocalStorage';
import { EASY_EMAIL_ADDRESS, 
         EASY_EMAIL_ADDRESS2, 
         EASY_EMAIL_ADDRESS3, 
         EASY_PASSWORD } from '../Constants';

class Login extends React.Component<ILoginInfoProps, ILoginInfoState>{

  public static defaultProps: ILoginInfoProps = {
    id: '0',
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

  easyLogin(type: number){
    let emailAddress: string;
    if(type === 1){
      emailAddress = EASY_EMAIL_ADDRESS;
    } else if(type === 2){
      emailAddress = EASY_EMAIL_ADDRESS2;
    } else {
      emailAddress = EASY_EMAIL_ADDRESS3;
    }

    let values: LoginInfo;
    values = {
      email: emailAddress,
      password: EASY_PASSWORD
    }
    UsersDataService.userLogin(values)
    .then(res =>{
      setLoginId(String(res.data.userId));
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
      setLoginId(String(res.data.userId));
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
      <div>
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
                    <Field type="password" name="password" placeholder="🔑Password" size="35"/>
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
          <small id="easyLoginHelpBlock" className="form-text text-muted">
            (Test User's target language... 1: Japanese, 2: Swedish, 3: Finnish)
          </small>
          <br/>
          <button type="button" 
                  className="btn btn-success" 
                  onClick={() => this.easyLogin(1)}
          ><span role="img" aria-label="light bulb">💡</span>Easy Log in (1)
          </button>
          &nbsp;&nbsp;
          <button type="button" 
                  className="btn btn-success" 
                  onClick={() => this.easyLogin(2)}
          ><span role="img" aria-label="light bulb">💡</span>Easy Log in (2)
          </button>
          &nbsp;&nbsp;
          <button type="button" 
                  className="btn btn-success" 
                  onClick={() => this.easyLogin(3)}
          ><span role="img" aria-label="light bulb">💡</span>Easy Log in (3)
          </button>
        </div>
      </div>
      <Footer/>
      </div>
    )
  }
}

export default Login; 