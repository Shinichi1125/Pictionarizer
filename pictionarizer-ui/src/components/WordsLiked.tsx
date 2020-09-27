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

class WordsLiked extends React.Component<IUserProps, IUserState>{
  
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
      isFollowing: false,
      isFollowed: false,
      words: new Array<Word>()
    }
    this.followUser = this.followUser.bind(this)
    this.unfollowUser = this.unfollowUser.bind(this)
  }

  componentDidMount(){
    let id = Number(this.props.match.params.id);
    let data: User;

    const followerRelation = {
      userId: loginState,
      followerId: id,
      followeeId: loginState
    }

    const followingRelation = {
      userId: loginState,
      followerId: loginState,
      followeeId: id
    }

    UsersDataService.retrieveUser(id)
    .then(res => {
      data = res.data;
      this.setState({userData:data});
    }) 

    WordsDataService.retrieveWordsLiked(id)
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
    UsersDataService.isFollowed(followerRelation)
    .then(res => {
      this.setState({isFollowed: res.data})
    })
    UsersDataService.isFollowing(followingRelation)
    .then(res => {
      this.setState({isFollowing: res.data})
    })
  }

  followUser(id: number){
    const followingRelation = {
      userId: loginState,
      followerId: loginState,
      followeeId: id
    }
    UsersDataService.followUser(followingRelation)
    .then(() => window.location.reload(true)) 
  }

  unfollowUser(id: number){
    const followingRelation = {
      userId: loginState,
      followerId: loginState,
      followeeId: id
    }
    UsersDataService.unfollowUser(followingRelation)
    .then(() => window.location.reload(true)) 
  }

  render(){    
    let user: User;
    user = this.state.userData;

    return(
      <div>
        {
          loginState === user.id? <span></span>:
          this.state.isFollowing? <button onClick={() => this.unfollowUser(user.id)} className="btn btn-primary follow-button">Following</button>:
          <button onClick={() => this.followUser(user.id)} className="btn btn-outline-primary follow-button">Follow</button>
        }  
        <div className="object-details">
          <img src={`${API_URL}/user/uploaded-image/${this.state.userId}`} 
              alt="fetched img" 
              className="large round-border user-details-image"
          />
          <h3 className="no-margin-bottom">
            <span className="yellow-highlight">&nbsp;{user.name}&nbsp;</span>
            <span className="small-font">&nbsp;(User ID: {user.id})&nbsp;&nbsp;</span>
            {
              this.state.isFollowed? <span className="small-font sky-background">&nbsp;Follows you&nbsp;</span>:
              <span></span>
            }
          </h3>
          <div>Learning: <strong>{user.targetLanguage}</strong></div>
          <div>Speaks: <strong>{user.ownLanguage}</strong></div>
          <div>Country: <strong>{user.country}</strong></div>
          <div>     
            <Link to={'/user/followings/' + String(user.id)}>
              {this.state.followings} Following, 
            </Link>
            {this.state.followers === 1? 
              <Link to={'/user/followers/' + String(user.id)}><span> {this.state.followers} Follower</span></Link>: 
              <Link to={'/user/followers/' + String(user.id)}><span> {this.state.followers} Followers</span></Link>
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
          <div className="follow-nav">
            <ul className="nav nav-pills nav-fill">
              <li className="nav-item">
                <Link to={'/user/details/' + String(this.state.userId)}>Words</Link>
              </li>
              <li className="nav-item follow-nav-selected">
                <Link  className="white-text" to={'/user/likes/' + String(this.state.userId)}>Likes</Link>
              </li>
            </ul>
          </div>
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

export default WordsLiked; 