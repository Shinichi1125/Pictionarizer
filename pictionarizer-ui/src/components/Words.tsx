import React from 'react';
import Word from '../interfaces/Word.interface';
import WordsDataService from '../api/WordsDataService';
//import UsersDataService from '../api/UsersDataService';
import { Link } from 'react-router-dom';
import { getLoginId } from '../LoginLocalStorage';
import WordRowCreator from './WordRowCreator';

const loginState = Number(getLoginId());

class Words extends React.Component{

  state = {
    wordsData: new Array<Word>()
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
        <div>
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
        </div>
      </div>
    )
  }
}

export default Words; 