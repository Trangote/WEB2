import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CameraService } from '../services/camera.service';
import { StudioService } from '../services/studio.service';
import { Camera } from '../models/camera';
import { Studio } from '../models/studio';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  selectedid: any;
  studios?: Studio[];
  errMessage: any;
  cameras?: Camera[];
  camera: any;
  studio: any;
  idUser: any;
  tuongTuStudios?: Studio[];
  tuongTuCameras?: Camera[];
  cong = 1;
  images1: Array<any> = [];
  images2: Array<any> = [];
  idPQ: any;
  typeUser: any;
  isDisable: boolean = false;
  constructor(
    private activatedR: ActivatedRoute,
    private studioService: StudioService,
    private cameraService: CameraService,
    private _toast: ToastrService,
    private route: Router
  ) {}

  ngOnInit(): void {
  this.idPQ = localStorage.getItem('_id')?.replace(/"/g, '');
  this.typeUser = localStorage.getItem('typeUser')?.replace(/"/g, '');
  if (this.typeUser == 'admin') {
    this.isDisable = true;
  }
    this.activatedR.paramMap.subscribe((params) => {
      let idP = params.get('idP');
      let idU = params.get('idU');
      this.idUser = idU;
      if (idP != null) {
        this.selectedid = idP;
      }
    });
    this.chiTietStudio();
    this.chiTietCamera();
  }
  chiTietStudio() {
    this.studioService.getStudios().subscribe({
      next: (data) => {
        this.tuongTuStudios = data;
        this.studios = data.filter((x) => x._id == this.selectedid);
        this.studio = this.studios[0];
        this.images2.push(
          this.studio.imgProduct1,
          this.studio.imgProduct2,
          this.studio.imgProduct3
        );
      },
      error: (err) => (this.errMessage = err),
    });
  }
  chiTietCamera() {
    this.cameraService.getCameras().subscribe({
      next: (data) => {
        this.tuongTuCameras = data;
        this.cameras = data.filter((x) => x._id == this.selectedid);
        this.camera = this.cameras[0];
        this.images1.push(
          this.camera.imgProduct1,
          this.camera.imgProduct2,
          this.camera.imgProduct3
        );
      },
      error: (err) => (this.errMessage = err),
    });
  }
  tangSanPham() {
    this.cong += 1;
  }
  giamSanPham() {
    if (this.cong > 1) {
      this.cong -= 1;
    } else {
      this._toast.warning('Vui lòng chọn ít nhất 1 sản phẩm', 'Lỗi!');
    }
  }
  tuongTu(id: any) {
    this.route.navigate(['/productdetails', this.idUser, id]);
    this.chiTietStudio();
    this.chiTietCamera();
  }
  DatThueCam(id: any) {
    

    this.route.navigate(['/datthue', this.idUser, id, this.cong]);
  }
  DatThueStu(id: any) {
    this.route.navigate(['/datthue', this.idUser, id, 0]);
  }


}
