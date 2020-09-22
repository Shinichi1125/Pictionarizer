import User from '../interfaces/User.interface';
import Word from '../interfaces/Word.interface';

export default interface IUserState {
  userId: string
  userData: User
  followings: number
  followers: number
  words:Array<Word>
}