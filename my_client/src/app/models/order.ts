export class Order {
  _id: any;
  userID?: string;
  productID?: string;
  orderID?: string;
  dateRent?: string;
  dateEnd?: string;
  productName?: string;
  dateReceive?: string;
  rentFor?: string;
  status?: string;
  datePay?: string;
  voucherID?: string;
  depositPrice?: string;
  timeRent?: string;
  fullName?: string;
  idCard?: string;
  phone?: string;
  email?: string;
  quantity?: number;
  constructor() {
    this._id = '';
    this.userID = '';
    this.productID = '';
    this.orderID = '';
    this.productName = '';
    this.dateReceive = '';
    this.rentFor = '';
    this.voucherID = '';
    this.depositPrice = '';
    this.timeRent = '';
    this.dateRent = '';
    this.dateEnd = '';
    this.fullName = '';
    this.idCard = '';
    this.phone = '';
    this.email = '';
    this.quantity = 0;
  }
}