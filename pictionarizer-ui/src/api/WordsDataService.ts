import axios from 'axios'
import { API_URL } from '../Constants'

class WordsDataService {
  retrieveAllWords(){
    return axios.get(`${API_URL}/words`);
  }
}

export default new WordsDataService()

