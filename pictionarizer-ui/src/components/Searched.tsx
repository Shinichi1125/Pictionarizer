import React from 'react';
import WordsDataService from '../api/WordsDataService'; 
import UsersDataService from '../api/UsersDataService';
import User from '../interfaces/User.interface';
import Word from '../interfaces/Word.interface';
import ISearchProps from '../interfaces/ISearchProps.interface';
import UserRowCreator from './UserRowCreator';

class Searched extends React.Component<ISearchProps>{

  state = {
    keyword: this.props.match.params.name,
    searchedUsers: new Array<User>(),
    searchedWords: new Array<Word>()
  }

  componentDidMount(){
    UsersDataService.retrieveUsersByName(this.state.keyword)
    .then(res => {
      this.setState({
        searchedUsers:[...this.state.searchedUsers, ...res.data]
      })
    }) 
  }

  render(){
    return(
      <div>
        <h3><span className="yellow-highlight">&nbsp;Search Result (Users)&nbsp;</span></h3>
        
        {this.state.searchedUsers.map((user)=>
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

export default Searched; 
