import React from 'react';
import WordsDataService from '../api/WordsDataService'; 
import User from '../interfaces/User.interface';
import ILikeProps from '../interfaces/ILikeProps.interface';
import ILikeState from '../interfaces/ILikeState.interface';
import UserRowCreator from './UserRowCreator';

class Likes extends React.Component<ILikeProps, ILikeState>{
  constructor(props: ILikeProps){
    super(props)

    this.state = {
      wordId: this.props.match.params.id,
      likers: new Array<User>()
    }
  }

  componentDidMount(){
    let id = Number(this.props.match.params.id);

    WordsDataService.retrieveLikers(id)
    .then(res => {
      this.setState({
        likers:[...this.state.likers, ...res.data]
      })
    }) 
  }

  render(){
    return(
      <div>
        <h3><span className="yellow-highlight">&nbsp;People who liked this word&nbsp;</span></h3>
        
        {this.state.likers.map((user)=>
          <UserRowCreator 
            key = {user.id}
            id={user.id}
            name={user.name}
            ownLanguage={user.ownLanguage}
            targetLanguage={user.targetLanguage}
            country={user.country}
            email={user.email}
            password={user.password}
            image={user.image}
            description={user.description}
          />)}

      </div>
    )
  }
}

export default Likes; 
