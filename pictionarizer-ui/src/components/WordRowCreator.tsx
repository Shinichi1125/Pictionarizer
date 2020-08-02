import React from 'react';
import Word from '../interfaces/Word.interface';
import { API_URL } from '../Constants';
import { Link } from 'react-router-dom';

class WordRowCreator extends React.Component<Word>{
  render(){
    let word = this.props;
    //let userName = null;
    //userName = UsersDataService.getUserName(word.userId);
    return(
        <div className="word-row">          
          <img src={`${API_URL}/word/uploaded-image/${word.id}`} 
              alt="fetched img" 
              className="row-image"
          />        
          <h5><Link to={'/word/details/' + String(word.id)}>{word.targetLangExSentence}</Link></h5>   
         {/* <p>by {userName !== null? userName: 'userName'}</p>  */} 
          <p>by {word.userId}  <span>&nbsp;&nbsp;{word.createdDate}</span></p>           
        </div>
    )
  }
}

export default WordRowCreator; 