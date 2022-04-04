import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productCamera = true;
  product: any;
  products: any;

  test={
    image:['https://blogger.googleusercontent.com/img/a/AVvXsEgco1njeOgFuO0aRNTP5L747E_tlPH3HRc1uRVBWHY9cux0elFYJQ4e4E1UqIunMByAfOzKgzHczFKXxrKybP060OA9imcWp6DWt0LFliL4gDl02pxB7NXPo7Wdik0rKr71fpe_bvDGehqPwYFdl-ZuMsaKsyshSbMKlgiA_U5AO1IN0tk6327q6LGM=s0','https://blogger.googleusercontent.com/img/a/AVvXsEgco1njeOgFuO0aRNTP5L747E_tlPH3HRc1uRVBWHY9cux0elFYJQ4e4E1UqIunMByAfOzKgzHczFKXxrKybP060OA9imcWp6DWt0LFliL4gDl02pxB7NXPo7Wdik0rKr71fpe_bvDGehqPwYFdl-ZuMsaKsyshSbMKlgiA_U5AO1IN0tk6327q6LGM=s0','https://blogger.googleusercontent.com/img/a/AVvXsEgco1njeOgFuO0aRNTP5L747E_tlPH3HRc1uRVBWHY9cux0elFYJQ4e4E1UqIunMByAfOzKgzHczFKXxrKybP060OA9imcWp6DWt0LFliL4gDl02pxB7NXPo7Wdik0rKr71fpe_bvDGehqPwYFdl-ZuMsaKsyshSbMKlgiA_U5AO1IN0tk6327q6LGM=s0']
  }

  constructor(private _service: ProductService) { }

  ngOnInit(): void {
    this.product = this._service.getData1();
    this.products = this._service.getData();
  }

}
