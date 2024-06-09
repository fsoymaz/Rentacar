export interface UserModel {
    id?: string;
    firstName?: string;
    lastName?: string;
    birthDate?: string;
    email?: string;
    username?: string;
    password?:string;
    confirmPassword?:string;
    cardId?: string;
  }