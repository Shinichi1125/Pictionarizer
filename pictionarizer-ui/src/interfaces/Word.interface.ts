export default interface Word {
  id: number;
  ownLangWordName: string;
  targetLangWordName: string;
  ownLangExSentence: string;
  targetLangExSentence: string;
  createdDate: Date;
  imageUrl?: string;
}