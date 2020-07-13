import React from 'react';
import Word from '../interfaces/Word.interface';
import WordsDataService from '../api/WordsDataService'; 
import IWordProps from '../interfaces/IWordProps.interface';
import IWordState from '../interfaces/IWordState.interface';
import { API_URL } from '../Constants';
import { Link } from 'react-router-dom';

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
        <img src={`${API_URL}/words/uploaded-image/${this.state.wordId}`} 
               alt="fetched img" 
               width="150"
               height="150"
        />
        <br></br>
        <div>Word: {word.targetLangWordName}</div>
        <div>Meaning: {word.ownLangWordName}</div>
        <div>Sentence: {word.targetLangExSentence}</div>
        <div>Meaning: {word.ownLangExSentence}</div>
        <div>Created Date: {String(word.createdDate)}</div>
        <div>Created by:  </div>
        <img src={`${API_URL}/users/uploaded-image/${this.state.wordData.userId}`} 
               alt="fetched img" 
               width="50"
               height="50"
        />
        <div><Link to={'/users/details/' + String(word.userId)}>User Info</Link></div>
        <div><Link to={'/words/' + String(word.id)}>Edit</Link></div>  
        <div><Link to={'/words/delete/' + String(word.id)}>Delete</Link></div>
      </div>
    )
  }
}

export default WordDetails; 