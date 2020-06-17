import axios from 'axios'
import { API_URL } from '../Constants'

class UsersDataService {
  retrieveAllUsers(){
    return axios.get(`${API_URL}/users`);
  }
}

export default new UsersDataService()

