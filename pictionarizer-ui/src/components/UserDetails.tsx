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
      followings: 0,
      followers: 0,
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

    UsersDataService.getNoOfFollowings(id)
    .then(res => {
      this.setState({followings:res.data})
    })

    UsersDataService.getNoOfFollowers(id)
    .then(res => {
      this.setState({followers: res.data})
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
          <h3 className="no-margin-bottom">
            <span className="yellow-highlight">&nbsp;{user.name}&nbsp;</span>
            <span className="small-font">&nbsp;(User ID: {user.id})&nbsp;</span>
          </h3>
          <div>Learning: <strong>{user.targetLanguage}</strong></div>
          <div>Speaks: <strong>{user.ownLanguage}</strong></div>
          <div>Country: <strong>{user.country}</strong></div>
          <div>
            {this.state.followings} Following, 
            {this.state.followers === 1? 
              <span> {this.state.followers} Follower</span>: 
              <span> {this.state.followers} Followers</span>
            } 
          </div>
          <br/>
          <div className="speech-bubble">{user.description}</div>   
          <br/>    
          <div>{loginState === user.id? <Link to={'/user/' + String(user.id)}><span role="img" aria-label="edit">✏️</span>Edit profile</Link>: <p> </p>}</div>  
          <div>
            {loginState === user.id && loginState !== TEST_USER_ID?
            <Link className="text-danger" to={'/user/delete/' + String(user.id)}><span role="img" aria-label="delete">🗑️</span>Delete account</Link>:
            <p> </p>}
          </div>
        </div>
        <div>
          <br/>
          <h3>【Words】</h3>
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