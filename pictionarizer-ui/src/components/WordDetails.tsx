import React from 'react';
import Word from '../interfaces/Word.interface';
import WordsDataService from '../api/WordsDataService'; 
import IWordProps from '../interfaces/IWordProps.interface';
import IWordState from '../interfaces/IWordState.interface';
import { API_URL, TEST_USER_ID } from '../Constants';
import { Link } from 'react-router-dom';
import { getLoginId } from '../LoginLocalStorage';

const loginState = Number(getLoginId());

class WordDetails extends React.Component<IWordProps, IWordState>{
  
  constructor(props: IWordProps){
    super(props)

    this.state = {
      wordId: this.props.match.params.id,
      wordData: {
        id: 0,
        userId: 0,
        ownLangWordName: '',
        targetLangWordName: '',
        ownLangExSentence: '',
        targetLangExSentence: '',
        createdDate: new Date(),
        image: new File(["foo"], "foo.txt")
      }
    }
  }

  componentDidMount(){
    let id = Number(this.props.match.params.id);
    let data: Word;

    WordsDataService.retrieveWord(id)
    .then(res => {
      data = res.data;
      this.setState({wordData:data});
    }) 
  }

  render(){
    let word: Word;
    word= this.state.wordData;

    return(
      <div>
        <h2>Word Details</h2>
        <div>Image:  </div>
        <img src={`${API_URL}/word/uploaded-image/${this.state.wordId}`} 
               alt="fetched img" 
               className="large"
        />
        <br></br>
        <div>Word: {word.targetLangWordName}</div>
        <div>Meaning: {word.ownLangWordName}</div>
        <div>Sentence: {word.targetLangExSentence}</div>
        <div>Meaning: {word.ownLangExSentence}</div>
        <div>Created Date: {String(word.createdDate)}</div>
        <div>Created by:  </div>
        <img src={word.userId > 0 ? 
          `${API_URL}/user/uploaded-image/${word.userId}` : 
          `${API_URL}/user/uploaded-image/${TEST_USER_ID}`} 
               alt="fetched img" 
               className="small round-border"
        />
        <div>
          <Link to={'/user/details/' + String(word.userId)}>ℹ️ User Info</Link>
        </div>
        <div>{loginState === word.userId? <Link to={'/word/' + String(word.id)}>✏️Edit</Link> : <p> </p>}</div>  
        <div>{loginState === word.userId? <Link to={'/word/delete/' + String(word.id)}>🗑️Delete</Link>: <p> </p>}</div>
      </div>
    )
  }
}

export default WordDetails; 