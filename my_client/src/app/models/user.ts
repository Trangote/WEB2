export class User {
  _id: any;
  userID?: string;
  gender?: string;
  dateOfBirth?: string;
  userName?: string;
  userPoint?: number;
  password?: string;
  confirmPass?: string;
  phone?: string;
  userAvatar?: {
    img?: string;
  };
  email?: string;
  fullName?: string;
  idCard?: string;
  typeUser?: string;
  notifications?: {
    title?: string;
    body?: string;
    createdAt?: string;
  };
  constructor() {
    this._id = '';
    this.userID = '';
    this.gender = 'Nam';
    this.dateOfBirth = '01/01/2022';
    this.userName = '';
    this.password = '';
    this.phone = '';
    this.email = '';
    this.fullName = '';
    this.idCard = '';
  }
}
