import axios from 'axios'
import { API_URL, CONFIG, TOAST_MILISEC } from '../Constants'
import Word from '../interfaces/Word.interface';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure();

class WordsDataService {
  retrieveAllWords(){
    return axios.get(`${API_URL}/words`);
  }

  retrieveWord(id: number){
    return axios.get(`${API_URL}/words/${id}`);
  } 

  makeFormData(word: Word){

    const formData = new FormData();
    formData.append('id', String(word.id));
    formData.append('ownLangWordName', word.ownLangWordName);
    formData.append('targetLangWordName', word.targetLangWordName);
    formData.append('ownLangExSentence', word.ownLangExSentence);
    formData.append('targetLangExSentence', word.targetLangExSentence);
    formData.append('createdDate', word.createdDate.toISOString());
    formData.append('image', word.image);

    return formData; 
  }

  createWord(word: Word){
    console.log("The content of the word object: ");
    console.log(word);
    const formData = this.makeFormData(word);
    return axios.post(`${API_URL}/words`, formData, CONFIG);
  }

  updateWord(id: number, word: Word){
    console.log("The content of the word object: ");
    console.log(word);
    const formData = this.makeFormData(word);
    return axios.put(`${API_URL}/words/${id}`, formData, CONFIG);
  }

  updateToast(object: String){
    toast(object + " updated successfully!", 
      {autoClose:TOAST_MILISEC, 
        position:toast.POSITION.BOTTOM_CENTER
      })
  }

  deleteWord(id: number){
    return axios.delete(`${API_URL}/words/${id}`);
  }
}

export default new WordsDataService()

