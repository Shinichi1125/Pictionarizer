import React from 'react';
import Comment from '../interfaces/Comment.interface';
import { API_URL } from '../Constants';
import { Link } from 'react-router-dom';
import UsersDataService from '../api/UsersDataService'; 
import moment from 'moment';

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
    const userId = this.props.userId;
    const text = this.props.text;
    const date = this.props.date; 

    return(
        <div className="comment-row">          
          <img src={`${API_URL}/user/uploaded-image/${userId}`} 
              alt="fetched img" 
              className="comment-row-image"
          />        
          <div className="comment-text">
            <Link to={'/user/details/' + String(userId)}>
              {this.state.userName}
            </Link>
            <br/>
            {text}
          </div>
          <span className="indentation">{moment(date).fromNow()}</span>
        </div>
    )
  }
}

export default CommentRowCreator; 