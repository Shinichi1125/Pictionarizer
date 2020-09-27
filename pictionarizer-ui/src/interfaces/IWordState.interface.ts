import Word from './Word.interface';

export default interface IWordState {
  wordId: string
  wordData: Word
  noOfLikes: number
  isLiked: boolean
}