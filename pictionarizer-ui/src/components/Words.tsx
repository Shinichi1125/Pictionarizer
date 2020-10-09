import React from 'react';
import Word from '../interfaces/Word.interface';
import WordsDataService from '../api/WordsDataService';
import { Link } from 'react-router-dom';
import { getLoginId } from '../LoginLocalStorage';
import HomeWordRow from './HomeWordRow';
import { Dropdown } from 'react-bootstrap';

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
        {loginState > 0?<Link to={'/word/create'}><button className="create-button">+New Word</button></Link>: <span></span>}
        
        <div>
          {this.state.wordsData.map((word)=>
          <HomeWordRow 
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


/*
<Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
*/ 