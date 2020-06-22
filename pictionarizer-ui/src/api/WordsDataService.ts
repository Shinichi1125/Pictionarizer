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

  createWord(word: Word){
    console.log("The content of the parameter: ");
    console.log(word);
    return axios.post(`${API_URL}/words`, word);
  }

  updateWord(id: number, word: Word){
    return axios.put(`${API_URL}/words/${id}`, word);
  }
}

export default new WordsDataService()

