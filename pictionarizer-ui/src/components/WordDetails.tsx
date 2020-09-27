import React from 'react';
import Word from '../interfaces/Word.interface';
import WordsDataService from '../api/WordsDataService'; 
import IWordProps from '../interfaces/IWordProps.interface';
import IWordState from '../interfaces/IWordState.interface';
import { API_URL, TEST_USER_ID } from '../Constants';
import { Link } from 'react-router-dom';
import { getLoginId } from '../LoginLocalStorage';

const loginState = Number(getLoginId());

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
      },
      noOfLikes: 0,
      isLiked: false
    }
  }

  componentDidMount(){
    let id = Number(this.props.match.params.id);
    let data: Word;

    const likeRelation = {
      userId: loginState,
      likeUserId: loginState,
      wordId: id
    }

    WordsDataService.retrieveWord(id)
    .then(res => {
      data = res.data;
      this.setState({wordData:data});
    }) 

    WordsDataService.getNoOfLikes(id)
    .then(res => {
      this.setState({noOfLikes:res.data})
    })

    WordsDataService.isLiked(likeRelation)
    .then(res => {
      this.setState({isLiked: res.data})
    })
  }

  render(){
    let word: Word;
    word= this.state.wordData;
    let date = String(word.createdDate);
    let truncatedDate = date.slice(0, 10);

    return(
      <div className="object-details">
        <h3 className="no-margin-bottom">
          <span className="yellow-highlight">&nbsp;<strong>"{word.targetLangWordName}"</strong>&nbsp;</span> 
        </h3>
        <div><strong>({word.ownLangWordName})</strong></div>
        <div className="space-out">
          <img src={`${API_URL}/word/uploaded-image/${this.state.wordId}`} 
                alt="fetched img" 
                className="large"
          />
        </div>
        <div className="word-text">
          <div><strong>{word.targetLangExSentence}</strong></div>
          <div className="white-text">({word.ownLangExSentence})</div> 
        </div>     
        <div>
          <img src={word.userId > 0 ? 
            `${API_URL}/user/uploaded-image/${word.userId}` : 
            `${API_URL}/user/uploaded-image/${TEST_USER_ID}`} 
                alt="fetched img" 
                className="small round-border"
          />
          &nbsp;
          {truncatedDate}
        </div>
        <div>
          <Link to={'/user/details/' + String(word.userId)}><span role="img" aria-label="info">ℹ️</span> User Info</Link>&nbsp;&nbsp;
          <span>{loginState === word.userId? <Link to={'/word/' + String(word.id)}><span role="img" aria-label="edit">✏️</span>Edit</Link> : <span></span>}</span>&nbsp;&nbsp;  
          <span>{loginState === word.userId? <Link className="text-danger" to={'/word/delete/' + String(word.id)}><span role="img" aria-label="delete">🗑️</span>Delete</Link>: <span></span>}</span>
        </div>     
        <br/>
        <div>   
          {
            this.state.isLiked? <button  className="like-button primary"><span role="img" aria-label="like">👍</span>Like</button>:
            <button  className="like-button outline-primary"><span role="img" aria-label="like">👍</span>Like</button>
          }     
          {this.state.noOfLikes === 1? 
            <Link to={'/word/likes/' + String(word.id)}><span> {this.state.noOfLikes} like</span></Link>: 
            this.state.noOfLikes === 0? <span></span>:
            <Link to={'/word/likes/' + String(word.id)}><span> {this.state.noOfLikes} likes</span></Link>
          } 
        </div>
      </div>
    )
  }
}

export default WordDetails; 