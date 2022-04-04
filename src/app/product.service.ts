import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  getData() {
    return [
      {
        name: 'Máy ảnh Canon',
        brand: 'Canon',
        origin: 'Nhật Bản',
        style: ' chân dung',
        price: '600.000',
        image:
          'https://blogger.googleusercontent.com/img/a/AVvXsEgco1njeOgFuO0aRNTP5L747E_tlPH3HRc1uRVBWHY9cux0elFYJQ4e4E1UqIunMByAfOzKgzHczFKXxrKybP060OA9imcWp6DWt0LFliL4gDl02pxB7NXPo7Wdik0rKr71fpe_bvDGehqPwYFdl-ZuMsaKsyshSbMKlgiA_U5AO1IN0tk6327q6LGM=s0',
      },
      {
        name: 'Máy ảnh Canon',
        brand: 'Canon',
        origin: 'Nhật Bản',
        style: ' chân dung',
        price: '600.000',
        image:
          'https://blogger.googleusercontent.com/img/a/AVvXsEgco1njeOgFuO0aRNTP5L747E_tlPH3HRc1uRVBWHY9cux0elFYJQ4e4E1UqIunMByAfOzKgzHczFKXxrKybP060OA9imcWp6DWt0LFliL4gDl02pxB7NXPo7Wdik0rKr71fpe_bvDGehqPwYFdl-ZuMsaKsyshSbMKlgiA_U5AO1IN0tk6327q6LGM=s0',
      },
      {
        name: 'Máy ảnh Canon',
        brand: 'Canon',
        origin: 'Nhật Bản',
        style: ' chân dung',
        price: '600.000',
        image:
          'https://blogger.googleusercontent.com/img/a/AVvXsEgco1njeOgFuO0aRNTP5L747E_tlPH3HRc1uRVBWHY9cux0elFYJQ4e4E1UqIunMByAfOzKgzHczFKXxrKybP060OA9imcWp6DWt0LFliL4gDl02pxB7NXPo7Wdik0rKr71fpe_bvDGehqPwYFdl-ZuMsaKsyshSbMKlgiA_U5AO1IN0tk6327q6LGM=s0',
      },
      {
        name: 'Máy ảnh Canon',
        brand: 'Canon',
        origin: 'Nhật Bản',
        style: ' chân dung',
        price: '600.000',
        image:
          'https://blogger.googleusercontent.com/img/a/AVvXsEgco1njeOgFuO0aRNTP5L747E_tlPH3HRc1uRVBWHY9cux0elFYJQ4e4E1UqIunMByAfOzKgzHczFKXxrKybP060OA9imcWp6DWt0LFliL4gDl02pxB7NXPo7Wdik0rKr71fpe_bvDGehqPwYFdl-ZuMsaKsyshSbMKlgiA_U5AO1IN0tk6327q6LGM=s0',
      },
    ];
  }
  getData1() {
    return [
      {
        name: 'Máy ảnh Canon',
        brand: 'Canon',
        origin: 'Nhật Bản',
        style: ' chân dung',
        price: '600.000',
        model: 'Canon Powershot G7X MKII',
        type: 'Máy ảnh số',
        imgfeature:
          'https://blogger.googleusercontent.com/img/a/AVvXsEh78uYefjoIbeWi_5mHMYRknlp9SRocyBjTVwDIATPQENAkkX3t1LdRc0aLdQQyAMf0JVIPxSK3KBTNnCAW5ukje8V6BhEE4b2re9WDQZvPFo-ZalXRMeyQ9KU5xomzk2S9e7PPGgmFr-SzCWxZ65Cij-evYZj7-RVJV8uvG83kku_9NgUyYbttWH8S=s0',
        details:
          'Máy ảnh Canon Powershot G7X MKII giúp người dùng có thể thoải mái chụp hình từ các góc máy khác nhau trở nên thuận tiện hơn nhờ tích hợp màn hình cảm ứng và màn hình LCD có thể nghiêng lên 180° và nghiêng xuống 45°. Bên cạnh đó, máy ảnh Canon cũng PowerShot G7 X Mark II cũng được trang bị nhiều chức năng chụp ảnh và quay phim giúp cho ra những bức ảnh cực "chất" theo phong cách riêng của bạn.',
        image1:
          'https://blogger.googleusercontent.com/img/a/AVvXsEgco1njeOgFuO0aRNTP5L747E_tlPH3HRc1uRVBWHY9cux0elFYJQ4e4E1UqIunMByAfOzKgzHczFKXxrKybP060OA9imcWp6DWt0LFliL4gDl02pxB7NXPo7Wdik0rKr71fpe_bvDGehqPwYFdl-ZuMsaKsyshSbMKlgiA_U5AO1IN0tk6327q6LGM=s0',
        image: [
          'https://blogger.googleusercontent.com/img/a/AVvXsEgco1njeOgFuO0aRNTP5L747E_tlPH3HRc1uRVBWHY9cux0elFYJQ4e4E1UqIunMByAfOzKgzHczFKXxrKybP060OA9imcWp6DWt0LFliL4gDl02pxB7NXPo7Wdik0rKr71fpe_bvDGehqPwYFdl-ZuMsaKsyshSbMKlgiA_U5AO1IN0tk6327q6LGM=s0',
          'https://blogger.googleusercontent.com/img/a/AVvXsEgco1njeOgFuO0aRNTP5L747E_tlPH3HRc1uRVBWHY9cux0elFYJQ4e4E1UqIunMByAfOzKgzHczFKXxrKybP060OA9imcWp6DWt0LFliL4gDl02pxB7NXPo7Wdik0rKr71fpe_bvDGehqPwYFdl-ZuMsaKsyshSbMKlgiA_U5AO1IN0tk6327q6LGM=s0',
          'https://blogger.googleusercontent.com/img/a/AVvXsEgco1njeOgFuO0aRNTP5L747E_tlPH3HRc1uRVBWHY9cux0elFYJQ4e4E1UqIunMByAfOzKgzHczFKXxrKybP060OA9imcWp6DWt0LFliL4gDl02pxB7NXPo7Wdik0rKr71fpe_bvDGehqPwYFdl-ZuMsaKsyshSbMKlgiA_U5AO1IN0tk6327q6LGM=s0',
        ],
      },
    ];
  }
}
