import axios from 'axios'
import { API_URL, CONFIG, TOAST_MILISEC } from '../Constants'
import User from '../interfaces/User.interface';
import LoginInfo from '../interfaces/LoginInfo.interface';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure();

class UsersDataService {
  retrieveAllUsers(){
    return axios.get(`${API_URL}/users`);
  }

  retrieveUser(id: number){
    return axios.get(`${API_URL}/user/${id}`);
  }  

  getUserName(userId: number){
    return axios.get(`${API_URL}/user/name/${userId}`)
  }

  getNoOfFollowings(userId: number){
    return axios.get(`${API_URL}/no-of-followings/${userId}`);
  }

  getNoOfFollowers(userId: number){
    return axios.get(`${API_URL}/no-of-followers/${userId}`);
  }

  retrieveFollowers(userId: number){
    return axios.get(`${API_URL}/followers/${userId}`);
  }

  retrieveFollowings(userId: number){
    return axios.get(`${API_URL}/followings/${userId}`);
  }

  makeUserFormData(user: User){
    const formData = new FormData();
    formData.append('id', String(user.id));
    formData.append('name', user.name);
    formData.append('ownLanguage', user.ownLanguage);
    formData.append('targetLanguage', user.targetLanguage);
    formData.append('country', user.country);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('image', user.image);
    formData.append('description', user.description);

    return formData; 
  }

  userLogin(loginInfo: LoginInfo){
    return axios.get(`${API_URL}/login`, {
      params: {
        email: loginInfo.email,
        password: loginInfo.password
      }
    });
  }

  createUser(user: User){
    const formData = this.makeUserFormData(user);
    return axios.post(`${API_URL}/user`, formData, CONFIG);
  }

  updateUser(id: number, user: User){
    const formData = this.makeUserFormData(user);
    return axios.put(`${API_URL}/user/${id}`, formData, CONFIG);
  }

  deleteUser(id: number){
    return axios.delete(`${API_URL}/user/${id}`);
  }

  formValidate(values: User){
    let errors: Partial<User> = {};
    if(values.name === ''){
      errors.name = "Enter a name"
    }
    if(values.ownLanguage === ''){
      errors.ownLanguage = "Enter your own language"
    }
    if(values.targetLanguage === ''){
      errors.targetLanguage = "Enter your target language"
    }
    if(values.email === ''){
      errors.email = "Enter your email address"
    }
    if(values.password.length < 8){
      errors.password = 'Enter at least 8 characters for your password'
    }

    return errors;
  }

  updateToast(object: String){
    toast(object + " updated successfully!", 
      {autoClose:TOAST_MILISEC, 
        position:toast.POSITION.BOTTOM_CENTER
      })
  }
}

export default new UsersDataService();



