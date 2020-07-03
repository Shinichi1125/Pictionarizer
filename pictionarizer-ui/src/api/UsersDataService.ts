import axios from 'axios'
import { API_URL, CONFIG } from '../Constants'
import User from '../interfaces/User.interface';

class UsersDataService {
  retrieveAllUsers(){
    return axios.get(`${API_URL}/users`);
  }

  retrieveUser(id: number){
    return axios.get(`${API_URL}/users/${id}`);
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
}

export default new UsersDataService()

