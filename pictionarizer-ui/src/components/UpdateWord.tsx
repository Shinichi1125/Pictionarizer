import React from 'react';
import Word from '../interfaces/Word.interface';
import WordsDataService from '../api/WordsDataService';
import { Formik, Form, Field, ErrorMessage } from 'formik'; 
import IWordProps from '../interfaces/IWordProps.interface';
import IWordState from '../interfaces/IWordState.interface';
import moment from 'moment';

class UpdateWord extends React.Component<IWordProps, IWordState>{
  
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
        imageUrl: ''
      }
    }

    this.onSubmit = this.onSubmit.bind(this)
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

  onSubmit(values: Word){
    let word = values;
    let id = word.id;

    WordsDataService.updateWord(id, word)
    .then(() => this.props.history.push('/'))       
  }

  render(){
    let { id, ownLangWordName, 
      targetLangWordName, ownLangExSentence, 
      targetLangExSentence, createdDate, 
      imageUrl} 
      = this.state.wordData; 

    return(
      <div>
        <h2>Update Word</h2>
        <div>
          <Formik
            initialValues={{ id, ownLangWordName, 
              targetLangWordName, ownLangExSentence, 
              targetLangExSentence, createdDate, 
              imageUrl}}
            onSubmit={this.onSubmit}
            enableReinitialize={true}
          >
            {
              (props) => (
                <Form>
                  <fieldset>
                    <label>Word (Target Language)</label>&nbsp;
                    <Field type="text" name="targetLangWordName"/>
                  </fieldset>
                  <fieldset>
                    <label>Word (Own Language)</label>&nbsp;
                    <Field type="text" name="ownLangWordName"/>
                  </fieldset>
                  <fieldset>
                    <label>Sentence (Target Language)</label>&nbsp;
                    <Field type="text" size="75" name="targetLangExSentence"/>
                  </fieldset>
                  <fieldset>
                    <label>Sentence (Own Language)</label>&nbsp;
                    <Field type="text" size="75" name="ownLangExSentence"/>
                  </fieldset>
                  <fieldset>
                    <label>Date</label>&nbsp;
                    <Field type="text" name="createdDate"/>
                  </fieldset>
                  <button type="submit">Save</button>
                </Form>
              )
            }      
          </Formik>
        </div>
      </div>
    )
  }
}

export default UpdateWord; 