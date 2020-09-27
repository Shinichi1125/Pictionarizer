import React from 'react';
import Word from '../interfaces/Word.interface';
import WordsDataService from '../api/WordsDataService';
import IWordProps from '../interfaces/IWordProps.interface';
import IWordState from '../interfaces/IWordState.interface';
import { API_URL } from '../Constants';

class DeleteWord extends React.Component<IWordProps, IWordState>{

  constructor(props: IWordProps){
    super(props)

    this.state = {
      wordId: this.props.match.params.id,
      wordData: {
        id: null,
        userId: null,
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

  cancelDelete(id: number){
    this.props.history.push('/word/details/' + id)
  }
  
  render(){
    let id = Number(this.state.wordId);
    let wordName = this.state.wordData.targetLangWordName;

    return(
      <div className="object-details">
        <h3>Are you sure you want to delete <span className="yellow-highlight">"{wordName}"</span>?</h3>
        <img src={`${API_URL}/word/uploaded-image/${id}`} 
               alt="fetched img" 
               className="extra-large"
          />
        <br></br>
        <br></br>
        <button className="btn btn-secondary" onClick={() => this.cancelDelete(id)}>Cancel</button>&nbsp;&nbsp;
        <button className="btn btn-danger" onClick={() => this.confirmDelete(id)}>Delete</button>        
      </div>
    )
  }
}

export default DeleteWord; 