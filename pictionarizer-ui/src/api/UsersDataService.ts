import axios from 'axios'
import { API_URL } from '../Constants'
import User from '../interfaces/User.interface';

class UsersDataService {
  retrieveAllUsers(){
    return axios.get(`${API_URL}/users`);
  }

  retrieveUser(id: number){
    return axios.get(`${API_URL}/users/${id}`);
  }  

  createUser(user: User){
    return axios.post(`${API_URL}/users`, user);
  }

  updateUser(id: number, user: User){
    return axios.put(`${API_URL}/users/${id}`, user);
  }
}

export default new UsersDataService()

