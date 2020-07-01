import React from 'react';
import Word from '../interfaces/Word.interface';
import WordsDataService from '../api/WordsDataService';
import IWordProps from '../interfaces/IWordProps.interface';
import IWordState from '../interfaces/IWordState.interface';

class DeleteWord extends React.Component<IWordProps, IWordState>{

  constructor(props: IWordProps){
    super(props)

    this.state = {
      wordId: this.props.match.params.id,
      wordData: {
        id: 0,
        ownLangWordName: '',
        targetLangWordName: '',
        ownLangExSentence: '',
        targetLangExSentence: '',
        createdDate: new Date,
        image: new File(["foo"], "foo.txt")
      }
    }

    this.confirmDelete = this.confirmDelete.bind(this)
    this.cancelDelete = this.cancelDelete.bind(this)
  }

  componentDidMount(){
    let id = Number(this.props.match.params.id);
    let data: Word;

    WordsDataService.retrieveWord(id)
    .then(res => {
      data = res.data;
      this.setState({wordData:data});
    }) 
  }

  confirmDelete(id: number){
    WordsDataService.deleteWord(id)
    .then(() => this.props.history.push('/'))       
  }

  cancelDelete(){
    this.props.history.push('/')
  }
  
  render(){
    let id = Number(this.state.wordId);
    let wordName = this.state.wordData.targetLangWordName;

    return(
      <div>
        <h2>Are you sure you want to delete "{wordName}"?</h2>
        <button onClick={() => this.confirmDelete(id)}>Yes</button>&nbsp;
        <button onClick={() => this.cancelDelete()}>No</button>
      </div>
    )
  }
}

export default DeleteWord; 