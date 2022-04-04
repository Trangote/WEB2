import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  products: any;

  productintro = [
    {
      image:
        'https://blogger.googleusercontent.com/img/a/AVvXsEgco1njeOgFuO0aRNTP5L747E_tlPH3HRc1uRVBWHY9cux0elFYJQ4e4E1UqIunMByAfOzKgzHczFKXxrKybP060OA9imcWp6DWt0LFliL4gDl02pxB7NXPo7Wdik0rKr71fpe_bvDGehqPwYFdl-ZuMsaKsyshSbMKlgiA_U5AO1IN0tk6327q6LGM=s0',
      name: 'CHO THUÊ MÁY ẢNH',
    },
    {
      image:
        'https://images.pexels.com/photos/7412111/pexels-photo-7412111.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      name: 'CHO THUÊ STUDIO',
    },
  ];

  albums = [
    {
      image:
        'https://images.pexels.com/photos/2026960/pexels-photo-2026960.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      name: 'Ảnh bé yêu',
    },
    {
      image:
        'https://images.pexels.com/photos/2026960/pexels-photo-2026960.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      name: 'Ảnh bé yêu',
    },
    {
      image:
        'https://images.pexels.com/photos/2026960/pexels-photo-2026960.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      name: 'Ảnh bé yêu',
    },
    {
      image:
        'https://images.pexels.com/photos/2026960/pexels-photo-2026960.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      name: 'Ảnh bé yêu',
    },
  ];
  constructor(private _service: ProductService) {}

  ngOnInit(): void {
    this.products = this._service.getData();
  }
}
