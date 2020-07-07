import React from 'react';
import Word from '../interfaces/Word.interface';
import WordsDataService from '../api/WordsDataService';
import { Formik, Form, Field, ErrorMessage } from 'formik'; 
import IWordProps from '../interfaces/IWordProps.interface';
import IWordState from '../interfaces/IWordState.interface';
import { API_URL } from '../Constants';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure();

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
        createdDate: new Date(),
        image: new File(["foo"], "foo.txt")
      }
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.validate = this.validate.bind(this)
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

  // gets invoked when "choose file" button is clicked and a file is chosen
  onChange(e: { currentTarget: HTMLInputElement; }){
    const chosenFile = e.currentTarget.files[0];
    let tempWordData = this.state.wordData;
    tempWordData.image = chosenFile;  
    this.setState({wordData:tempWordData});
  }  

  // An image file is fetched from the state, 
  // whereas the rest come from the Formik form.
  // The state and the form get merged and sent 
  // as an axios request in the WordsDataService
  async onSubmit(values: Word){
    values.createdDate = new Date(values.createdDate);
    let word = {
      ...values,
      image: this.state.wordData.image
    };
    let id = word.id;

    await WordsDataService.updateWord(id, word)
    .then(() => WordsDataService.updateToast("Word")) 
    .then(() => this.props.history.push('/'))   // gets back to the home page
    .then(() => window.location.reload(true))   // refresh the page to reflect the change   
  }

  render(){
    let { id, ownLangWordName, 
      targetLangWordName, ownLangExSentence, 
      targetLangExSentence, createdDate, 
      image} 
      = this.state.wordData; 

    return(
      <div>
        <h2>Update Word</h2>
        <img src={`${API_URL}/words/uploaded-image/${this.state.wordId}`} 
               alt="fetched img" 
               width="150"
               height="150"
          />
        <br></br>
        <div>
          <Formik
            initialValues={{ id, ownLangWordName, 
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

export default UpdateWord; 