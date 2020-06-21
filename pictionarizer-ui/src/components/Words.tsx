import React from 'react';
import Word from '../interfaces/Word.interface';
import WordsDataService from '../api/WordsDataService'

class Words extends React.Component{

  state = {
    wordsData:new Array<Word>()
  }

  componentWillMount(){
    //axios.get('http://localhost:8080/pictionarizerservices/api/words')
    WordsDataService.retrieveAllWords()
    .then(res => {
      const data = res.data;
      this.setState({
        wordsData:[...this.state.wordsData, ...data]
      })
    })
  }

  render(){
    return(
      <div>
        <h2>Words:</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Word (OL)</th>
              <th>Word (TL)</th>
              <th>Sentence (OL)</th>
              <th>Sentence (TL)</th>
              <th>Created Date</th>
            </tr>
          </thead>
          <tbody>
            {this.state.wordsData.map((word)=>
            <WordRowCreator 
              key = {word.id}
              id={word.id}
              ownLangWordName={word.ownLangWordName}
              targetLangWordName={word.targetLangWordName}
              ownLangExSentence={word.ownLangExSentence}
              targetLangExSentence={word.targetLangExSentence}
              createdDate={word.createdDate}
            />)}
          </tbody>
        </table>
      </div>
    )
  }
}

class WordRowCreator extends React.Component<Word>{
  render(){
    let word = this.props;
    return(
        <tr>
          <td>{word.id}</td>
          <td>{word.ownLangWordName}</td>
          <td>{word.targetLangWordName}</td>
          <td>{word.ownLangExSentence}</td>
          <td>{word.targetLangExSentence}</td>
          <td>{word.createdDate}</td>
        </tr>
    )
  }
}

export default Words; 