import User from '../interfaces/User.interface';

export default interface IFollowState {
  userId: string
  followers: Array<User>
  followings: Array<User>
}