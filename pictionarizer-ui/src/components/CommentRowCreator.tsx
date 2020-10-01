import React from 'react';
import Comment from '../interfaces/Comment.interface';
import { API_URL } from '../Constants';
import { Link } from 'react-router-dom';
import UsersDataService from '../api/UsersDataService'; 
import WordsDataService from '../api/WordsDataService'; 
import moment from 'moment';
import { getLoginId } from '../LoginLocalStorage';

const loginState = Number(getLoginId());

class CommentRowCreator extends React.Component<Comment>{

  state = {
    userName: ''
  }

  componentDidMount(){
    let id = this.props.userId;

    UsersDataService.getUserName(id)
    .then(res => {
      this.setState({userName:res.data});
    }) 
  }

  render(){
    const id = this.props.commentId;
    const userId = this.props.userId;
    const text = this.props.text;
    const date = this.props.date; 

    return(
      <div>
        <div className="comment-row">          
          <img src={`${API_URL}/user/uploaded-image/${userId}`} 
              alt="fetched img" 
              className="comment-row-image"
          />  
          <div className="flex">      
          <div className="comment-text">
            <Link to={'/user/details/' + String(userId)}>
              {this.state.userName}
            </Link>
            <br/>
            {text}
          </div>
          <div>
            {
              loginState === userId? 
                <button onClick={() => deleteComment(id)} className="action-button outline-danger">Delete</button>:
                <span></span>
            }  
          </div>
          </div>
          <span className="indentation">{moment(date).fromNow()}</span>
        </div>
        
      </div>
    )
  }
}

const deleteComment = (id:number) => {
  console.log('The passed comment id: ' + id);
  WordsDataService.deleteComment(id);
  window.location.reload(true);
}

export default CommentRowCreator; 