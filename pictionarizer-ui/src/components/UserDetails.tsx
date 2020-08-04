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
import WordRowCreator from './WordRowCreator'

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
        <div className="object-details">
          <img src={`${API_URL}/user/uploaded-image/${this.state.userId}`} 
              alt="fetched img" 
              className="large round-border user-details-image"
          />
          <br></br>
          <h3 className="no-margin-bottom">
            <span className="yellow-highlight">&nbsp;{user.name}&nbsp;</span>
          </h3>
          <div>Learning: <strong>{user.targetLanguage}</strong></div>
          <div>Speaks: <strong>{user.ownLanguage}</strong></div>
          <div>Country: <strong>{user.country}</strong></div>
          <br/>
          <div className="speech-bubble">{user.description}</div>   
          <br/>    
          <div>{loginState === user.id? <Link to={'/user/' + String(user.id)}><span role="img" aria-label="edit">✏️</span>Edit</Link>: <p> </p>}</div>  
          <div>
            {loginState === user.id && loginState !== TEST_USER_ID?
            <Link to={'/user/delete/' + String(user.id)}><span role="img" aria-label="delete">🗑️</span>Delete</Link>:
            <p> </p>}
          </div>
        </div>
        <div>
          Words: <br></br>
          {this.state.words.map((word)=>
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

export default UserDetails; 