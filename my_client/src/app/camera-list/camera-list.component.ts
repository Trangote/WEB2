import { Component, OnInit } from '@angular/core';
import { CameraService } from '../services/camera.service';
import { Camera } from '../models/camera';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camera-list',
  templateUrl: './camera-list.component.html',
  styleUrls: ['./camera-list.component.css'],
})
export class CameraListComponent implements OnInit {
  errMessage: any;
  cameras?: Camera[];
  iff = false;
  selectedBrand?: any;
  selectedType?: any;
  filter_brand = {
    All_brand: true,
    Canon: false,
    Nikon: false,
    Sony: false,
    Kodak: false,
    FujiFilm: false,
  };
  cameras3: Camera[] = [];
  filteredCamera3: Camera[] = [];
  filter_type = {
    All_type: true,
    May_anh_co: false,
    May_anh_du_lich: false,
    May_anh_bridge: false,
    May_anh_so: false,
  };
  idUser = localStorage.getItem('_id')?.replace(/"/g, '');
  filter_other = { filter_price: true, filter_quantity: true };
  camerasNB?: Camera[];
  camerasNB2?: Camera[];
  searchText?: string;
  constructor(private cameraService: CameraService, private router: Router) {}

  ngOnInit(): void {
    this.loadCameras();
    this.loadCamerasNoiBat();
  }
  loadCamerasNoiBat() {
    this.cameraService.getCameras().subscribe((data) => {
      this.camerasNB = data;
      this.camerasNB2 = this.camerasNB.sort((a: any, b: any) =>
        a.quantity < b.quantity ? 1 : a.quantity > b.quantity ? -1 : 0
      );
    });
  }
  loadCameras() {
    this.filter_brand = {
      All_brand: true,
      Canon: false,
      Nikon: false,
      Sony: false,
      Kodak: false,
      FujiFilm: false,
    };
    this.filter_type = {
      All_type: true,
      May_anh_co: false,
      May_anh_du_lich: false,
      May_anh_bridge: false,
      May_anh_so: false,
    };
    this.cameraService.getCameras().subscribe({
      next: (data) => (this.cameras3 = data),
      error: (err) => (this.errMessage = err),
    });
  }
  filterChange() {
    if (
      this.filter_brand.Canon ||
      this.filter_brand.Sony ||
      this.filter_brand.Nikon ||
      this.filter_brand.Kodak ||
      this.filter_brand.FujiFilm ||
      this.filter_type.May_anh_co ||
      this.filter_type.May_anh_du_lich ||
      this.filter_type.May_anh_bridge ||
      this.filter_type.May_anh_so
    ) {
      this.filter_brand.All_brand = false;
      this.filter_type.All_type = false;
    }

    this.cameraService.getCameras().subscribe((data) => {
      this.cameras3 = data.filter(
        (x) =>
          ((x.brand === 'Canon' ||
            x.brand === 'Nikon' ||
            x.brand === 'Sony' ||
            x.brand === 'Kodak' ||
            x.brand === 'FujiFilm') &&
            this.filter_brand.All_brand) ||
          (x.brand === 'Canon' && this.filter_brand.Canon) ||
          (x.brand === 'Nikon' && this.filter_brand.Nikon) ||
          (x.brand === 'Sony' && this.filter_brand.Sony) ||
          (x.brand === 'Kodak' && this.filter_brand.Kodak) ||
          (x.brand === 'FujiFilm' && this.filter_brand.FujiFilm) ||
          ((x.type === 'Máy ảnh cơ' ||
            x.type === 'Máy ảnh du lịch' ||
            x.type === 'Máy ảnh bridge' ||
            x.type === 'Máy ảnh số') &&
            this.filter_type.All_type) ||
          (x.type === 'Máy ảnh cơ' && this.filter_type.May_anh_co) ||
          (x.type === 'Máy ảnh du lịch' && this.filter_type.May_anh_du_lich) ||
          (x.type === 'Máy ảnh bridge' && this.filter_type.May_anh_bridge) ||
          (x.type === 'Máy ảnh số' && this.filter_type.May_anh_so)
      );
    });
    if (this.cameras3.length > 0) {
      this.iff = false;
    } else {
      this.iff = true;
    }
  }
  selectAllBrand() {
    this.filterChange();
    this.filter_brand = {
      All_brand: true,
      Canon: false,
      Nikon: false,
      Sony: false,
      Kodak: false,
      FujiFilm: false,
    };
  }
  selectAllType() {
    this.filterChange();
    this.filter_type = {
      All_type: true,
      May_anh_co: false,
      May_anh_du_lich: false,
      May_anh_bridge: false,
      May_anh_so: false,
    };
  }
  sapxepPrice() {
    if (this.filter_other.filter_price) {
      this.cameras3 = this.cameras3.sort((a: any, b: any) =>
        a.unitPrice < b.unitPrice ? 1 : a.unitPrice > b.unitPrice ? -1 : 0
      );
    }
  }
  sapxepQuantity() {
    if (this.filter_other.filter_quantity) {
      this.cameras3 = this.cameras3.sort((a: any, b: any) =>
        a.quantity < b.quantity ? 1 : a.quantity > b.quantity ? -1 : 0
      );
    }
  }
  chitiet(x: Camera){
    this.router.navigate(['/productdetails', this.idUser, x._id]);
  }
}
