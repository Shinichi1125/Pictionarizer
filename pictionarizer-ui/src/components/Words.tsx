import React from 'react';
import Word from '../interfaces/Word.interface';
import WordsDataService from '../api/WordsDataService';
import { Link } from 'react-router-dom';
import { API_URL } from '../Constants'

class Words extends React.Component{

  state = {
    wordsData:new Array<Word>()
  }

  componentWillMount(){
    WordsDataService.retrieveAllWords()
    .then(res => {
      const data = res.data;
      this.setState({
        wordsData:[...this.state.wordsData, ...data]
      })
    })
  }

  render(){
    return(
      <div>
        <Link to={'words/create'}>+Word</Link>
        <h2>Words:</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Word (TL)</th>
              <th>Word (OL)</th>
              <th>Sentence (TL)</th>
              <th>Sentence (OL)</th>
              <th>Created Date</th>
            </tr>
          </thead>
          <tbody>
            {this.state.wordsData.map((word)=>
            <WordRowCreator 
              key = {word.id}
              id={word.id}
              ownLangWordName={word.ownLangWordName}
              targetLangWordName={word.targetLangWordName}
              ownLangExSentence={word.ownLangExSentence}
              targetLangExSentence={word.targetLangExSentence}
              createdDate={word.createdDate}
            />)}
          </tbody>
        </table>
      </div>
    )
  }
}

class WordRowCreator extends React.Component<Word>{
  render(){
    let word = this.props;
    return(
        <tr>
          <td>{word.id}</td>
          <td>{word.targetLangWordName}</td>
          <td>{word.ownLangWordName}</td>
          <td>{word.targetLangExSentence}</td>
          <td>{word.ownLangExSentence}</td>        
          <td>{word.createdDate}</td>
          <td>
          <img src={`${API_URL}/words/uploaded-image/${word.id}`} 
               alt="fetched img" 
               width="75"
               height="75"
          />
          </td>
          <td><Link to={'words/' + String(word.id)}>Edit</Link></td>  
          <td><Link to={'words/delete/' + String(word.id)}>Delete</Link></td>   
        </tr>
    )
  }
}

export default Words; 