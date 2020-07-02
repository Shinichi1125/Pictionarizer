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
        id: 0,
        ownLangWordName: '',
        targetLangWordName: '',
        ownLangExSentence: '',
        targetLangExSentence: '',
        createdDate: new Date,
        image: new File(["foo"], "foo.txt")
      }
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.awaitSetState = this.awaitSetState.bind(this)
  }

  componentDidMount(){
    // directly mutating the state. to be refined later 
    this.state.wordData.id = null; 
  }

  async awaitSetState(stateUpdate: Word){
    await this.setState({wordData : stateUpdate})
  }

  onChange(e: { currentTarget: HTMLInputElement; }){
    const chosenFile = e.currentTarget.files[0];
    console.log("The value of chosenFile:");
    console.log(chosenFile);

    let tempWordData = this.state.wordData;
    tempWordData.image = chosenFile;  

    this.awaitSetState(tempWordData);
    console.log("The value of this.state.wordData: ");
    console.log(this.state.wordData);
  }  

  onSubmit(values: Word){
    let word = values;

    WordsDataService.createWord(word)
    .then(() => this.props.history.push('/'))       
  }
  
  render(){
    let { id, ownLangWordName, 
      targetLangWordName, ownLangExSentence, 
      targetLangExSentence, createdDate, 
      image} 
      = this.state.wordData; 

    return(
      <div>
        <h2>Create Word</h2>
        <div>
          <Formik
            initialValues={{ id, ownLangWordName, 
              targetLangWordName, ownLangExSentence, 
              targetLangExSentence, createdDate, 
              image}}
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