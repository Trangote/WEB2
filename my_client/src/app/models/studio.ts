export class Studio {
  _id: any;
  productName?: string;
  unitPrice?: number;
  style?: string;
  album?: string; 
  productDescription?: string;
  imgProduct1?: string;
  imgProduct2?: string;
  imgProduct3?: string;
  imgProduct4?: string;
  quantity?: number;
  constructor() {
    this._id = '';
    this.productName = '';
    this.unitPrice = 0;
    this.style = '';
    this.album = '';
    this.productDescription = '';
    this.imgProduct1 = '';
    this.imgProduct2 = '';
    this.imgProduct3 = '';
    this.imgProduct4 = '';
    this.quantity = 0;
  }
}
