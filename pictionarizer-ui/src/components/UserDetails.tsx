import React from 'react';
import User from '../interfaces/User.interface';
import Word from '../interfaces/Word.interface';
import UsersDataService from '../api/UsersDataService'; 
import WordsDataService from '../api/WordsDataService';
import IUserProps from '../interfaces/IUserProps.interface';
import IUserState from '../interfaces/IUserState.interface';
import { API_URL, TEST_USER_ID } from '../Constants';
import { Link } from 'react-router-dom';
import { getLoginId } from '../LoginLocalStorage';

const loginState = Number(getLoginId());

class UserDetails extends React.Component<IUserProps, IUserState>{
  
  constructor(props: IUserProps){
    super(props)

    this.state = {
      userId: this.props.match.params.id,
      userData: {
        id: null,
        name: '',
        ownLanguage: '',
        targetLanguage: '',
        country: '',
        email: '',
        password: '',
        image: null,
        description: '' 
      },
      words: new Array<Word>()
    }
  }

  componentDidMount(){
    let id = Number(this.props.match.params.id);
    let data: User;

    UsersDataService.retrieveUser(id)
    .then(res => {
      data = res.data;
      this.setState({userData:data});
    }) 

    WordsDataService.retrieveWordsByUser(id)
    .then(response => {
      const info = response.data;
      this.setState({
        words:[...this.state.words, ...info]
      })
    })
  }

  render(){    
    let user: User;
    user = this.state.userData;

    return(
      <div>
        <h2>User Details</h2>
        <img src={`${API_URL}/user/uploaded-image/${this.state.userId}`} 
            alt="fetched img" 
            className="large round-border"
        />
        <br></br>
        <div>Name: {user.name}</div>
        <div>Target Language: {user.targetLanguage}</div>
        <div>Own Language: {user.ownLanguage}</div>
        <div>Country: {user.country}</div>
        <div>Description: {user.description}</div>       
        <div>{loginState === user.id? <Link to={'/user/' + String(user.id)}>Edit</Link>: <p> </p>}</div>  
        <div>
          {loginState === user.id && loginState !== TEST_USER_ID?
          <Link to={'/user/delete/' + String(user.id)}>Delete</Link>:
          <p> </p>}
        </div>
        <div>
          Words: <br></br>
          {this.state.words.map((word)=>
            <WordsList 
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

class WordsList extends React.Component<Word>{

  render(){
    let word = this.props;
    
    return(
        <div>
          <span>{word.targetLangWordName}</span> &nbsp;&nbsp;
          <span>
            <img src={`${API_URL}/word/uploaded-image/${word.id}`} 
                alt="fetched img" 
                width="50"
                height="50"
            />  
          </span>&nbsp;&nbsp;
          <span><Link to={'/word/details/' + String(word.id)}>Details</Link></span> 
        </div>
    )
  }
}

export default UserDetails; 