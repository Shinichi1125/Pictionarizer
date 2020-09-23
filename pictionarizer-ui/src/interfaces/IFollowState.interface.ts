import User from '../interfaces/User.interface';

export default interface IFollowState {
  userId: string
  userName: string
  followers: Array<User>
  followings: Array<User>
}