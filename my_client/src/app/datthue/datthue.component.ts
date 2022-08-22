import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  NgForm,
} from '@angular/forms';
import { customValidator } from '../validators/check.validators';
import { Studio } from '../models/studio';
import { Camera } from '../models/camera';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CameraService } from '../services/camera.service';
import { StudioService } from '../services/studio.service';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { KhuyenmaiService } from '../services/khuyenmai.service';
import { KhuyenMai } from '../models/khuyenmai';
import { SwPush, SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-datthue',
  templateUrl: './datthue.component.html',
  styleUrls: ['./datthue.component.css'],
})
export class DatthueComponent implements OnInit {
  title = 'my_client';
  regForm!: FormGroup;
  user: any;
  camera: any;
  studio: any;
  idUser: any;
  selectedid: any;
  soluong: any;
  errMessage: any;
  cameras?: Camera[];
  studios?: Studio[];
  users?: User[];
  resData: any;
  idKhuyenMai?: any;
  khuyenmais?: KhuyenMai[];
  khuyenmai: any;
  diemcon: any;
  khuyenmailoc?: KhuyenMai[];
  updated: boolean = false;
  quantity?: number;
  readonly VAPID_KEY =
    'BH0ns3J-fiW3YpJ_fctsGLQ2RWaIWHH10tX_i_-AsEVh_UaXf_bRf3BD4OpYh8stkvRQk38z--y0FCfuJH56l28';
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private cameraService: CameraService,
    private studioService: StudioService,
    private activatedR: ActivatedRoute,
    private route: Router,
    private orderService: OrderService,
    private khuyenmaiService: KhuyenmaiService,
    private toast: ToastrService,
    private _swU: SwUpdate,
    private _swP: SwPush
  ) {
    this._swU.activateUpdate().then(() => {
      this.updated = true;
    });
  }

  ngOnInit(): void {
    this.activatedR.paramMap.subscribe((params) => {
      let idP = params.get('idP');
      let idU = params.get('idU');
      let soluong = params.get('soluong');
      let idKhuyenMai = params.get('idKM');
      if (idKhuyenMai != null) {
        this.idKhuyenMai = idKhuyenMai;
      }
      this.idUser = idU;
      this.soluong = soluong;
      if (this.soluong == 0) {
        this.quantity = 1;
      } else {
        this.quantity = this.soluong;
      }
      if (idP != null) {
        this.selectedid = idP;
      }
    });
    this.getProduct();
    this.getUser();
    this.getKhuyenMai();
    this.regForm = this.formBuilder.group({
      _id: [''],
      productName: [''],
      userID: [''],
      productID: [''],
      orderID: [''],
      dateRent: [''],
      dateEnd: [''],
      status: [''],
      datePay: [''],
      depositPrice: [''],
      quantity: [''],
      dateReceive: ['', Validators.required],
      timeRent: ['', Validators.required],
      rentFor: ['1 ngày', Validators.required],
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          customValidator(
            /\@|\#|\$|\&|\%|\*|\!|\^|\+|\-|\:|\;|\,|\.|\?|\`|\=|\(|\|\/|\<|\>\{|\}|\[|\]|\"|\'|\)|\~/g
          ),
        ],
      ],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      idCard: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(12),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      voucherID: [''],
    });
  }
  get f() {
    return this.regForm!.controls;
  }
  getUser() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data.filter((x) => x._id == this.idUser);
      this.user = this.users[0];
    });
  }
  getProduct() {
    if (this.soluong != 0) {
      this.cameraService.getCameras().subscribe((data) => {
        this.cameras = data.filter((x) => x._id == this.selectedid);
        this.camera = this.cameras[0];
      });
    } else {
      this.studioService.getStudios().subscribe((data) => {
        this.studios = data.filter((x) => x._id == this.selectedid);
        this.studio = this.studios[0];
      });
    }
  }
  pushNoti() {
    var time = Date.now();
    if (this._swU.isEnabled) {
      this._swP
        .requestSubscription({
          serverPublicKey: this.VAPID_KEY,
        })
        .then((info) => {
          this.userService.sendNotificationDT(info).subscribe();
        });
    }
    var noti = {
      title: 'Đặt thuê thành công',
      body:
        'Bạn đã đặt thuê đơn hàng ' +
        this.regForm.value.orderID +
        ' thành công!',
      createdAt: time,
    };
    this.userService.updateUserNoti(this.idUser, noti).subscribe((res) => {
      let resData = JSON.parse(JSON.stringify(res));
      if (resData.message === 'success') {
      } else {
      }
    });
  }
  submitData() {
    var time = Date.now();
    var timeend1 = new Date(time);
    var timeend = timeend1.setDate(timeend1.getDate() + 1);
    if (this.regForm?.invalid) {
      return;
    }
    if (this.soluong != 0) {
      this.regForm.value.productName = this.camera.productName;
    } else {
      this.regForm.value.productName = this.studio.productName;
    }
    this.regForm.value.userID = this.idUser;
    this.regForm.value.productID = this.selectedid;
    this.regForm.value.orderID = 'ORDER' + this.idUser + time.toString();
    this.regForm.value.quantity = this.quantity;
    this.regForm.value.dateRent = time.toString();
    this.regForm.value.dateEnd = timeend.toString();
    this.regForm.value.status = 'Chưa thanh toán';
    this.regForm.value.datePay = '';
    this.regForm.value.voucherID = this.idKhuyenMai;
    this.regForm.value.depositPrice = '';
    this.orderService.postOrder(this.regForm.value).subscribe((res) => {
      let resData = JSON.parse(JSON.stringify(res));
      if (resData.message === 'success') {
        this.khuyenmaiService.getKhuyenMais().subscribe((data) => {
          this.khuyenmailoc = data.filter((x) => x._id == this.idKhuyenMai);
          this.khuyenmai = this.khuyenmailoc[0];
        });
        this.diemcon = this.user.userPoint - this.khuyenmai.voucherPoint;
        var diemso: User = {
          _id: this.idUser,
          userPoint: parseInt(this.diemcon),
        };
        this.userService.patchUser(diemso._id, diemso).subscribe((res) => {
          let resData = JSON.parse(JSON.stringify(res));
          if (resData.message === 'success') {
            this.pushNoti();
            this.route.navigate([
              '/datthue',
              this.idUser,
              this.selectedid,
              this.soluong,
              this.idKhuyenMai,
              'thanhtoan',
              this.regForm.value.orderID,
            ]);
          } else {
            this.toast.error('Đặt thuê thất bại 1', 'Thất bại!');
          }
        });
      } else {
        this.toast.error('Đặt thuê thất bại 2', 'Thất bại!');
      }
    });
  }
  DatThueCam(id: any) {
    this.route.navigate([
      '/datthue',
      this.idUser,
      id,
      this.soluong,
      'khuyenmai',
    ]);
  }
  DatThueStu(id: any) {
    this.route.navigate(['/datthue', this.idUser, id, 0, 'khuyenmai']);
  }
  getKhuyenMai() {
    this.khuyenmaiService.getKhuyenMais().subscribe((data) => {
      this.khuyenmais = data.filter((x) => x._id == this.idKhuyenMai);
      this.khuyenmai = this.khuyenmais[0];
    });
  }
}
