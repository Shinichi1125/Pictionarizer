export default interface Word {
  id: number;
  userId: number;
  ownLangWordName: string;
  targetLangWordName: string;
  ownLangExSentence: string;
  targetLangExSentence: string;
  createdDate: Date;
  image: File;
}