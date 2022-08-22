export class Camera {
  _id: any;
  productName?: string;
  unitPrice?: number;
  brand?: string;
  type?: string;
  origin?: string;
  model?: string;
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
    this.brand = '';
    this.type = '';
    this.origin = '';
    this.model = '';
    this.productDescription = '';
    this.imgProduct1 = '';
    this.imgProduct2 = '';
    this.imgProduct3 = '';
    this.imgProduct4 = '';
    this.quantity = 0;
  }
}
