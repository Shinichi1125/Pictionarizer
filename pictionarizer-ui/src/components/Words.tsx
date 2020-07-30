import React from 'react';
import Word from '../interfaces/Word.interface';
import WordsDataService from '../api/WordsDataService';
import { Link } from 'react-router-dom';
import { API_URL } from '../Constants';
import { getLoginId } from '../LoginLocalStorage';

const loginState = Number(getLoginId());

class Words extends React.Component{

  state = {
    wordsData:new Array<Word>()
  }

  componentDidMount(){
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
        <Link to={'/users'}>Users</Link>
        <br/><hr></hr><br/>
        {loginState > 0?<Link to={'word/create'}>+Word</Link>: <p> </p>}
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
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {this.state.wordsData.map((word)=>
            <WordRowCreator 
              key = {word.id}
              id={word.id}
              userId={word.userId}
              ownLangWordName={word.ownLangWordName}
              targetLangWordName={word.targetLangWordName}
              ownLangExSentence={word.ownLangExSentence}
              targetLangExSentence={word.targetLangExSentence}
              createdDate={word.createdDate}
              image={word.image}
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
            <img src={`${API_URL}/word/uploaded-image/${word.id}`} 
                alt="fetched img" 
                className="normal-size"
            />            
          </td>
          <td><Link to={'word/details/' + String(word.id)}>Details</Link></td>   
        </tr>
    )
  }
}

export default Words; 