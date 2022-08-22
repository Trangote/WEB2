import { Component, OnInit } from '@angular/core';
import { StudioService } from '../services/studio.service';
import { Studio } from '../models/studio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studio-list',
  templateUrl: './studio-list.component.html',
  styleUrls: ['./studio-list.component.css'],
})
export class StudioListComponent implements OnInit {
  studios?: Studio[];
  errMessage: any;
  studiosNB?: Studio[];
  studiosNB2?: Studio[];
  idUser = localStorage.getItem('_id')?.replace(/"/g, '');
  iff = false;
  selectedAlbum?: any;
  selectedStyle?: any;
  filter_album = {
    All_album: true,
    Anh_cuoi: false,
    Nghe_thuat: false,
    Be_yeu: false,
    Chan_dung: false,
    Gia_dinh: false,
    Ba_bau: false,
    Ky_yeu: false,
    Cap_doi: false,
    San_pham: false,
  };
  studios3: Studio[] = [];
  filteredStudios3: Studio[] = [];
  filter_style = {
    All_style: true,
    Vintage: false,
    Hien_dai: false,
    Hoang_gia: false,
    Thien_nhien: false,
    Duong_pho: false,
    Toi_gian: false,
    Nghe_thuat: false,
  };
  filter_other = { filter_price: true, filter_quantity: true };
  searchText?: string;

  constructor(private studioService: StudioService, private router: Router) {}

  ngOnInit(): void {
    this.loadStudios();
    this.loadStudiosNB();
  }
  loadStudiosNB() {
    this.studioService.getStudios().subscribe((data) => {
      this.studiosNB = data;
      this.studiosNB2 = this.studiosNB.sort((a: any, b: any) =>
        a.quantity < b.quantity ? 1 : a.quantity > b.quantity ? -1 : 0
      );
    });
  }
  loadStudios() {
    this.filter_album = {
      All_album: true,
      Anh_cuoi: false,
      Nghe_thuat: false,
      Be_yeu: false,
      Chan_dung: false,
      Gia_dinh: false,
      Ba_bau: false,
      San_pham: false,
      Ky_yeu: false,
      Cap_doi: false,
    };
    this.filter_style = {
      All_style: true,
      Vintage: false,
      Hien_dai: false,
      Hoang_gia: false,
      Thien_nhien: false,
      Duong_pho: false,
      Toi_gian: false,
      Nghe_thuat: false,
    };
    this.studioService.getStudios().subscribe({
      next: (data) => (this.studios3 = data),
      error: (err) => (this.errMessage = err),
    });
  }
  filterChange() {
    if (
      this.filter_album.Anh_cuoi ||
      this.filter_album.Nghe_thuat ||
      this.filter_album.Be_yeu ||
      this.filter_album.Chan_dung ||
      this.filter_album.Gia_dinh ||
      this.filter_album.Ba_bau ||
      this.filter_album.Ky_yeu ||
      this.filter_album.San_pham ||
      this.filter_album.Cap_doi ||
      this.filter_style.Vintage ||
      this.filter_style.Hien_dai ||
      this.filter_style.Toi_gian ||
      this.filter_style.Hoang_gia ||
      this.filter_style.Thien_nhien ||
      this.filter_style.Duong_pho ||
      this.filter_style.Nghe_thuat
    ) {
      this.filter_album.All_album = false;
      this.filter_style.All_style = false;
    } 
    this.studioService.getStudios().subscribe((data) => {
      this.studios3 = data.filter(
        (x) =>
          ((x.album === 'Ảnh cưới' ||
            x.album === 'Ảnh nghệ thuật' ||
            x.album === 'Ảnh bé yêu' ||
            x.album === 'Ảnh chân dung' ||
            x.album === 'Ảnh gia đình' ||
            x.album === 'Ảnh bà bầu' ||
            x.album === 'Ảnh sản phẩm' ||
            x.album === 'Ảnh kỷ yếu' ||
            x.album === 'Ảnh cặp đôi') &&
            this.filter_album.All_album) ||
          (x.album === 'Ảnh cưới' && this.filter_album.Anh_cuoi) ||
          (x.album === 'Ảnh nghệ thuật' && this.filter_album.Nghe_thuat) ||
          (x.album === 'Ảnh bé yêu' && this.filter_album.Be_yeu) ||
          (x.album === 'Ảnh chân dung' && this.filter_album.Chan_dung) ||
          (x.album === 'Ảnh gia đình' && this.filter_album.Gia_dinh) ||
          (x.album === 'Ảnh bà bầu' && this.filter_album.Ba_bau) ||
          (x.album === 'Ảnh sản phẩm' && this.filter_album.San_pham) ||
          (x.album === 'Ảnh kỷ yếu' && this.filter_album.Ky_yeu) ||
          (x.album === 'Ảnh cặp đôi' && this.filter_album.Cap_doi) ||
          ((x.style === 'Vintage' ||
            x.style === 'Hiện đại' ||
            x.style === 'Hoàng gia' ||
            x.style === 'Thiên nhiên' ||
            x.style === 'Đường phố' ||
            x.style === 'Tối giản' ||
            x.style === 'Nghệ thuật') &&
            this.filter_style.All_style) ||
          (x.style === 'Vintage' && this.filter_style.Vintage) ||
          (x.style === 'Hiện đại' && this.filter_style.Hien_dai) ||
          (x.style === 'Hoàng gia' && this.filter_style.Hoang_gia) ||
          (x.style === 'Thiên nhiên' && this.filter_style.Thien_nhien) ||
          (x.style === 'Đường phố' && this.filter_style.Duong_pho) ||
          (x.style === 'Tối giản' && this.filter_style.Toi_gian) ||
          (x.style === 'Nghệ thuật' && this.filter_style.Nghe_thuat)
      );
    });
    if (this.studios3.length > 0) {
      this.iff = false;
    } else {
      this.iff = true;
    }
  }
  selectAllAlbum() {
    this.filterChange();
    this.filter_album = {
      All_album: true,
      Anh_cuoi: false,
      Nghe_thuat: false,
      Be_yeu: false,
      Chan_dung: false,
      Gia_dinh: false,
      Ba_bau: false,
      San_pham: false,
      Ky_yeu: false,
      Cap_doi: false,
    };
  }
  selectAllStyle() {
    this.filterChange();
    this.filter_style = {
      All_style: true,
      Vintage: false,
      Hien_dai: false,
      Hoang_gia: false,
      Thien_nhien: false,
      Duong_pho: false,
      Toi_gian: false,
      Nghe_thuat: false,
    };
  }
  sapxepPrice() {
    if (this.filter_other.filter_price) {
      this.studios3 = this.studios3.sort((a: any, b: any) =>
        a.unitPrice < b.unitPrice ? 1 : a.unitPrice > b.unitPrice ? -1 : 0
      );
    }
  }
  sapxepQuantity() {
    if (this.filter_other.filter_quantity) {
      this.studios3 = this.studios3.sort((a: any, b: any) =>
        a.quantity < b.quantity ? 1 : a.quantity > b.quantity ? -1 : 0
      );
    }
  }
  chitiet(x: Studio){
    this.router.navigate(['/productdetails', this.idUser, x._id]);
  }
}
