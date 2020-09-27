import User from '../interfaces/User.interface';

export default interface ILikeState {
  wordId: string
  likers: Array<User>
}