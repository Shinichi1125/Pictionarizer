import axios from 'axios'
import { API_URL } from '../Constants'
import Word from '../interfaces/Word.interface';

class WordsDataService {
  retrieveAllWords(){
    return axios.get(`${API_URL}/words`);
  }

  retrieveWord(id: number){
    return axios.get(`${API_URL}/words/${id}`);
  }  

  updateWord(id: number, word: Word){
    return axios.put(`${API_URL}/users/${id}`, word);
  }
}

export default new WordsDataService()

