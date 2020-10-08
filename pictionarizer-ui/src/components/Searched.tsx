import React from 'react';
import WordsDataService from '../api/WordsDataService'; 
import UsersDataService from '../api/UsersDataService';
import User from '../interfaces/User.interface';
import Word from '../interfaces/Word.interface';
import ISearchProps from '../interfaces/ISearchProps.interface';
import UserRowCreator from './UserRowCreator';
import WordRowCreator from './WordRowCreator';

class Searched extends React.Component<ISearchProps>{

  state = {
    keyword: this.props.match.params.name,
    searchedUsers: new Array<User>(),
    searchedWords: new Array<Word>(),
    areUsersFound: false,
    areWordsFound: false,
    userFilterSelected: false,
    wordFilterSelected: false
  }

  componentDidMount(){
    UsersDataService.retrieveUsersByName(this.state.keyword)
    .then(res => {
      this.setState({
        searchedUsers:[...this.state.searchedUsers, ...res.data]
      })
      if(this.state.searchedUsers.length > 0){
        this.setState({areUsersFound:true})
      }   
    }) 

    WordsDataService.retrieveWordsByName(this.state.keyword)
    .then(res => {
      this.setState({
        searchedWords:[...this.state.searchedWords, ...res.data]
      })
      if(this.state.searchedWords.length > 0){
        this.setState({areWordsFound:true})
      }   
    }) 
  }

  filterByUser(){
    this.setState({userFilterSelected:true})
    this.setState({wordFilterSelected:false})
  }

  filterByWord(){
    this.setState({userFilterSelected:false})
    this.setState({wordFilterSelected:true})
  }

  render(){
    return(
      <div>
        <div className="btn-toolbar search-filter-button" role="toolbar" aria-label="Toolbar with button groups">
          <div className="btn-group mr-2" role="group" aria-label="First group">
            <button onClick={() => this.filterByUser()} type="button" className="btn btn-secondary">Users</button>
          </div>
          <div className="btn-group mr-2" role="group" aria-label="Second group">
            <button onClick={() => this.filterByWord()} type="button" className="btn btn-secondary">Words</button>
          </div>
        </div>
        {
          (this.state.areUsersFound && this.state.areWordsFound && 
          !this.state.userFilterSelected && !this.state.wordFilterSelected) ||
          (this.state.areUsersFound && !this.state.areWordsFound && 
          !this.state.userFilterSelected && !this.state.wordFilterSelected) ||
          (this.state.areUsersFound && this.state.areWordsFound && this.state.userFilterSelected) || 
          this.state.areUsersFound && !this.state.areWordsFound && this.state.userFilterSelected?
          <div>
            <h3><span className="yellow-highlight">&nbsp;Users whose names contain "{this.state.keyword}"&nbsp;</span></h3>      
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
          </div>:
          (!this.state.areUsersFound && this.state.areWordsFound && 
           !this.state.userFilterSelected && !this.state.wordFilterSelected) ||
          this.state.areUsersFound && this.state.areWordsFound && this.state.wordFilterSelected ||
          !this.state.areUsersFound && this.state.areWordsFound && this.state.wordFilterSelected?
          <div>
            <h3><span className="yellow-highlight">&nbsp;Words that contain "{this.state.keyword}" &nbsp;</span></h3>      
            {this.state.searchedWords.map((word)=>
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
          </div>:     
          !this.state.areUsersFound && this.state.userFilterSelected?
          <h3>No user found with the keyword "{this.state.keyword}"</h3>:
          !this.state.areWordsFound && this.state.wordFilterSelected?
          <h3>No word found with the keyword "{this.state.keyword}"</h3>:
          <h3>Nothing found with the keyword "{this.state.keyword}"</h3>
        }
        
      </div>
    )
  }
}

export default Searched; 

/*
this.state.areUsersFound && this.state.areWordsFound && this.state.userFilterSelected?
          <div>
            <h3><span className="yellow-highlight">&nbsp;Filtered by Users&nbsp;</span></h3>      
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
          </div>:

this.state.areUsersFound && this.state.areWordsFound && this.state.wordFilterSelected?
          <div>
            <h3><span className="yellow-highlight">&nbsp;Filtered by Words&nbsp;</span></h3>      
            {this.state.searchedWords.map((word)=>
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
          </div>:
*/
