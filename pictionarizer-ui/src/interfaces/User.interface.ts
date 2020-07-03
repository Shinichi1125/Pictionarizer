export default interface User {
  id: number;
  name: string;
  ownLanguage: string;
  targetLanguage: string;
  country: string;
  email: string;
  password: string;
  image?: File;
  description?: string; 
}