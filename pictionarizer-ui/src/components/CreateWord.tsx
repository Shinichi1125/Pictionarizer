import React from 'react';
import Word from '../interfaces/Word.interface';
import WordsDataService from '../api/WordsDataService';
import { Formik, Form, Field, ErrorMessage } from 'formik'; 
import IWordProps from '../interfaces/IWordProps.interface';
import IWordState from '../interfaces/IWordState.interface';

class CreateWord extends React.Component<IWordProps, IWordState>{

  constructor(props: IWordProps){
    super(props)

    this.state = {
      wordId: this.props.match.params.id,
      wordData: {
        id: null,
        userId: 0,
        ownLangWordName: '',
        targetLangWordName: '',
        ownLangExSentence: '',
        targetLangExSentence: '',
        createdDate: new Date(),
        image: new File(["foo"], "foo.txt")
      }
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.validate = this.validate.bind(this)
  }

  validate(values: Word){
    let errors: Partial<Word> = {};
    if(values.targetLangWordName === ''){
      errors.targetLangWordName = "Enter a word in your target language"
    }
    if(values.ownLangWordName === ''){
      errors.ownLangWordName = "Enter a word in your own language"
    }
    if(values.targetLangExSentence === ''){
      errors.targetLangExSentence = "Enter an example sentence in your target language"
    }
    if(values.ownLangExSentence === ''){
      errors.ownLangExSentence = "Enter an example sentence in your own language"
    }
    if(this.state.wordData.image.name === 'foo.txt'){
      errors.targetLangWordName = 'Not only filling the text fields, you must choose an image as well'
    }

    return errors; 
  }

  onChange(e: { currentTarget: HTMLInputElement; }){
    const chosenFile = e.currentTarget.files[0];
    let tempWordData = this.state.wordData;
    tempWordData.image = chosenFile;  
    this.setState({wordData:tempWordData});
  }  

  async onSubmit(values: Word){
    let word = {
      ...values, 
      image: this.state.wordData.image, 
      id: this.state.wordData.id
    };

    await WordsDataService.createWord(word)
    .then(() => this.props.history.push('/'))       
  }
  
  render(){
    let { id, userId, ownLangWordName, 
      targetLangWordName, ownLangExSentence, 
      targetLangExSentence, createdDate, 
      image} 
      = this.state.wordData; 

    return(
      <div>
        <h2>Create Word</h2>
        <div>
          <Formik
            initialValues={{ id, userId, ownLangWordName, 
              targetLangWordName, ownLangExSentence, 
              targetLangExSentence, createdDate, 
              image}}
            onSubmit={this.onSubmit}
            validate={this.validate}
            enableReinitialize={true}
          >
            {
              (props) => (
                <Form>
                  <ErrorMessage name="targetLangWordName" component="div"/>
                  <fieldset>
                    <label>Word (Target Language)</label>&nbsp;
                    <Field type="text" name="targetLangWordName"/>
                  </fieldset>
                  <ErrorMessage name="ownLangWordName" component="div"/>
                  <fieldset>
                    <label>Word (Own Language)</label>&nbsp;
                    <Field type="text" name="ownLangWordName"/>
                  </fieldset>
                  <ErrorMessage name="targetLangExSentence" component="div"/>
                  <fieldset>
                    <label>Sentence (Target Language)</label>&nbsp;
                    <Field type="text" size="75" name="targetLangExSentence"/>
                  </fieldset>
                  <ErrorMessage name="ownLangExSentence" component="div"/>
                  <fieldset>
                    <label>Sentence (Own Language)</label>&nbsp;
                    <Field type="text" size="75" name="ownLangExSentence"/>
                  </fieldset>
                  <fieldset>
                    <label>Date</label>&nbsp;
                    <Field type="text" name="createdDate"/>
                  </fieldset>
                  <fieldset>
                    <label>Image</label>&nbsp;
                    <input id="image" type="file" name="image" onChange={this.onChange}/>
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

export default CreateWord; 