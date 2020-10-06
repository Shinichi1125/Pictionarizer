import React from 'react';
import Word from '../interfaces/Word.interface';
import User from '../interfaces/User.interface';
import { API_URL } from '../Constants';
import { Link } from 'react-router-dom';
import UsersDataService from '../api/UsersDataService'; 
import WordsDataService from '../api/WordsDataService';
import moment from 'moment';

class HomeWordRow extends React.Component<Word>{

  state = {
    userData: {
      id: 0,
      name: '',
      ownLanguage: '',
      targetLanguage: '',
      country: '',
      email: '',
      password: '',
      image: new File(["foo"], "foo.txt"),
      description: '' 
    },
    noOfLikes: 0,
    noOfComments: 0
  }

  componentDidMount(){
    let id = this.props.userId;
    let data: User;
    let wordId = this.props.id;

    UsersDataService.retrieveUser(id)
    .then(res => {
      data = res.data;
      this.setState({userData:data});
    }) 

    WordsDataService.getNoOfLikes(wordId)
    .then(res => {
      this.setState({noOfLikes: res.data});
    })

    WordsDataService.getNoOfComments(wordId)
    .then(res => {
      this.setState({noOfComments: res.data});
    })
  }

  render(){
    let word = this.props;
    let userName = this.state.userData.name;
    let targetLanguage = this.state.userData.targetLanguage;

    return(
        <div className="home-word-row">          
          <img src={`${API_URL}/word/uploaded-image/${word.id}`} 
              alt="fetched img" 
              className="row-image"
          />        
          <h5>
            <Link to={'/word/details/' + String(word.id)}>{word.targetLangExSentence}</Link>
          </h5>   
          <p>
            by <Link to={'/user/details/' + String(word.userId)}>{userName}</Link>  
            <span>&nbsp;
              <span>
                in {targetLanguage}
              </span>
              &nbsp;{moment(word.createdDate).fromNow()}
            </span>
            {this.state.noOfComments === 1? 
              <span>,&nbsp;&nbsp; {this.state.noOfComments} comment</span>: 
              this.state.noOfComments === 0? <span></span>:
              <span>,&nbsp;&nbsp; {this.state.noOfComments} comments</span>
            } 
            {this.state.noOfLikes === 1? 
              <span>,&nbsp;&nbsp; {this.state.noOfLikes} like</span>: 
              this.state.noOfLikes === 0? <span></span>:
              <span>,&nbsp;&nbsp; {this.state.noOfLikes} likes</span>
            } 
          </p>           
        </div>
    )
  }
}

export default HomeWordRow; 