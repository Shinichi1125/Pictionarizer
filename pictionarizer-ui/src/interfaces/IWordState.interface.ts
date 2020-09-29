import Word from './Word.interface';
import Comment from './Comment.interface';

export default interface IWordState {
  wordId: string
  wordData: Word
  noOfLikes: number
  isLiked: boolean
  noOfComments: number
  comments: Array<Comment>
}