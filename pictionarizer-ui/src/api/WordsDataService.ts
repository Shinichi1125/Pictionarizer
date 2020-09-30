import axios from 'axios';
import { API_URL, CONFIG, TOAST_MILISEC } from '../Constants';
import Word from '../interfaces/Word.interface';
import Comment from '../interfaces/Comment.interface';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LikeRelation from '../interfaces/LikeRelation.interface';

toast.configure();

class WordsDataService {
  retrieveAllWords(){
    return axios.get(`${API_URL}/words`);
  }

  retrieveWord(id: number){
    return axios.get(`${API_URL}/word/${id}`);
  } 

  retrieveWordsByUser(userId: number){
    return axios.get(`${API_URL}/words/${userId}`);
  }

  retrieveWordsLiked(userId: number){
    return axios.get(`${API_URL}/words-liked/${userId}`);
  }

  getNoOfLikes(wordId: number){
    return axios.get(`${API_URL}/no-of-likes/${wordId}`);
  }

  retrieveLikers(wordId: number){
    return axios.get(`${API_URL}/likers/${wordId}`);
  }

  getNoOfComments(wordId: number){
    return axios.get(`${API_URL}/no-of-comments/${wordId}`);
  }

  retrieveComments(wordId: number){
    return axios.get(`${API_URL}/comments/${wordId}`);
  }

  isLiked(combination: LikeRelation){
    return axios.get(`${API_URL}/is-liked`, {
      params: {
        userId: combination.userId,
        likeUserId: combination.likeUserId,
        wordId: combination.wordId
      }
    });
  }  

  makeLikeFormData(combination: LikeRelation){
    const formData = new FormData();

    formData.append('userId', String(combination.userId));
    formData.append('likeUserId', String(combination.likeUserId));
    formData.append('wordId', String(combination.wordId));
    
    return formData; 
  }

  likeWord(combination: LikeRelation){
    const formData = this.makeLikeFormData(combination);
    return axios.post(`${API_URL}/like`, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  unlikeWord(combination: LikeRelation){
    return axios.delete(`${API_URL}/unlike`, {
      params: {
        userId: combination.userId,
        likeUserId: combination.likeUserId,
        wordId: combination.wordId
      }
    });
  }

  makeCommentFormData(combination: Comment){
    const formData = new FormData();

    formData.append('wordId', String(combination.wordId));
    formData.append('userId', String(combination.userId));
    formData.append('text', String(combination.text));
    formData.append('date', combination.date.toISOString());
    
    return formData; 
  }

  postComment(combination: Comment){
    const formData = this.makeCommentFormData(combination);
    return axios.post(`${API_URL}/comment`, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  makeWordFormData(word: Word){

    const formData = new FormData();
    formData.append('id', String(word.id));
    formData.append('userId', String(word.userId));
    formData.append('ownLangWordName', word.ownLangWordName);
    formData.append('targetLangWordName', word.targetLangWordName);
    formData.append('ownLangExSentence', word.ownLangExSentence);
    formData.append('targetLangExSentence', word.targetLangExSentence);
    formData.append('createdDate', word.createdDate.toISOString());
    formData.append('image', word.image);

    return formData; 
  }

  createWord(word: Word){
    const formData = this.makeWordFormData(word);
    return axios.post(`${API_URL}/word`, formData, CONFIG);
  }

  updateWord(id: number, word: Word){
    const formData = this.makeWordFormData(word);
    return axios.put(`${API_URL}/word/${id}`, formData, CONFIG);
  }

  updateToast(object: String){
    toast(object + " updated successfully!", 
      {autoClose:TOAST_MILISEC, 
        position:toast.POSITION.BOTTOM_CENTER
      })
  }

  deleteWord(id: number){
    return axios.delete(`${API_URL}/word/${id}`);
  }
}

export default new WordsDataService()

