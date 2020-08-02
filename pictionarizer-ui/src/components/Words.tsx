import React from 'react';
import Word from '../interfaces/Word.interface';
import WordsDataService from '../api/WordsDataService';
//import UsersDataService from '../api/UsersDataService';
import { Link } from 'react-router-dom';
import { API_URL } from '../Constants';
import { getLoginId } from '../LoginLocalStorage';

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
          <h5><Link to={'word/details/' + String(word.id)}>{word.targetLangExSentence}</Link></h5>   
         {/* <p>by {userName !== null? userName: 'userName'}</p>  */} 
          <p>by {word.userId}  <span>&nbsp;&nbsp;{word.createdDate}</span></p>    
          <br/>         
        </div>
    )
  }
}

export default Words; 