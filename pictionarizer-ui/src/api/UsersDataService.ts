import axios from 'axios'
import { API_URL, CONFIG, TOAST_MILISEC } from '../Constants'
import User from '../interfaces/User.interface';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure();

class UsersDataService {
  retrieveAllUsers(){
    return axios.get(`${API_URL}/users`);
  }

  retrieveUser(id: number){
    return axios.get(`${API_URL}/users/${id}`);
  }  

  getUserName(userId: number){
    return axios.get(`${API_URL}/users/name/${userId}`)
  }

  makeFormData(user: User){
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

  createUser(user: User){
    const formData = this.makeFormData(user);
    return axios.post(`${API_URL}/users`, formData, CONFIG);
  }

  updateUser(id: number, user: User){
    const formData = this.makeFormData(user);
    return axios.put(`${API_URL}/users/${id}`, formData, CONFIG);
  }

  deleteUser(id: number){
    return axios.delete(`${API_URL}/users/${id}`);
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

export default new UsersDataService()

