import User from '../interfaces/User.interface';
import Word from '../interfaces/Word.interface';

export default interface ISearchState {
  name: string
  searchedUsers: Array<User>
  searchedWords: Array<Word>
}