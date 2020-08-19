import React from 'react';
import Word from '../interfaces/Word.interface';
import User from '../interfaces/User.interface';
import { API_URL } from '../Constants';
import { Link } from 'react-router-dom';
import UsersDataService from '../api/UsersDataService'; 
import moment from 'moment';

class WordRowCreator extends React.Component<Word>{

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
    }
  }

  componentDidMount(){
    let id = Number(this.props.userId);
    let data: User;

    UsersDataService.retrieveUser(id)
    .then(res => {
      data = res.data;
      this.setState({userData:data});
    }) 
  }

  render(){
    let word = this.props;
    let userName = this.state.userData.name;
    let targetLanguage = this.state.userData.targetLanguage;

    return(
        <div className="word-row">          
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
          </p>           
        </div>
    )
  }
}

export default WordRowCreator; 