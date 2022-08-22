import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { KhuyenmaiService } from '../services/khuyenmai.service';
import { KhuyenMai } from '../models/khuyenmai';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Order } from '../models/order';
import { CameraService } from '../services/camera.service';
import { StudioService } from '../services/studio.service';
import { Camera } from '../models/camera';
import { Studio } from '../models/studio';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  CountdownConfig,
  CountdownEvent,
  CountdownModule,
} from 'ngx-countdown';
import { OrderService } from '../services/order.service';
import { SwPush, SwUpdate } from '@angular/service-worker';
const CountdownTimeUnits: Array<[string, number]> = [
  ['Y', 1000 * 60 * 60 * 24 * 365], // years
  ['M', 1000 * 60 * 60 * 24 * 30], // months
  ['D', 1000 * 60 * 60 * 24], // days
  ['H', 1000 * 60 * 60], // hours
  ['m', 1000 * 60], // minutes
  ['s', 1000], // seconds
  ['S', 1], // million seconds
];

@Component({
  selector: 'app-thanhtoan',
  templateUrl: './thanhtoan.component.html',
  styleUrls: ['./thanhtoan.component.css'],
})
export class ThanhtoanComponent implements OnInit {
  readonly VAPID_KEY =
    'BH0ns3J-fiW3YpJ_fctsGLQ2RWaIWHH10tX_i_-AsEVh_UaXf_bRf3BD4OpYh8stkvRQk38z--y0FCfuJH56l28';
  idUser: any;
  selectedid: any;
  user?: any;
  user3?: any;
  users?: User[];
  users3?: User[];
  soluong: any;
  order: any;
  order1: any;
  orders?: Order[];
  orders1?: Order[];
  idKhuyenMai?: any;
  idOrder?: any;
  tienDatThue: any;
  tienDatCoc: any;
  cameras?: Camera[];
  camera: any;
  khuyenmai: any;
  khuyenmais?: KhuyenMai[];
  studio: any;
  quantity: number = 1;
  studios?: Studio[];
  totalquantity: any;
  constructor(
    public dialog: MatDialog,
    private khuyenmaiService: KhuyenmaiService,
    private activatedR: ActivatedRoute,
    private route: Router,
    private userService: UserService,
    private toast: ToastrService,
    private cameraService: CameraService,
    private studioService: StudioService,
    private orderService: OrderService,
    private _swU: SwUpdate,
    private _swP: SwPush
  ) {}

  ngOnInit(): void {
    this.activatedR.paramMap.subscribe((params) => {
      let idP = params.get('idP');
      let idU = params.get('idU');
      let soluong = params.get('soluong');
      let idKhuyenMai = params.get('idKM');
      let idOrder = params.get('idOrder');
      this.idUser = idU;
      this.soluong = soluong;
      if (this.soluong == 0) {
        this.quantity = 1;
      } else {
        this.quantity = parseInt(this.soluong);
      }
      if (idKhuyenMai != null) {
        this.idKhuyenMai = idKhuyenMai;
      }
      if (idOrder != null) {
        this.idOrder = idOrder;
      }
      if (idP != null) {
        this.selectedid = idP;
      }
    });
    this.getOrder();
  }
  pushNoti() {
    var time = Date.now();
    if (this._swU.isEnabled) {
      this._swP
        .requestSubscription({
          serverPublicKey: this.VAPID_KEY,
        })
        .then((info) => {
          this.userService.sendNotificationTT(info).subscribe();
        });
    }
    var noti = {
      title: 'Thanh toán thành công',
      body: 'Bạn đã thanh toán đơn hàng ' + this.idOrder + ' thành công!',
      createdAt: time,
    };
    this.userService.updateUserNoti(this.idUser, noti).subscribe((res) => {
      let resData = JSON.parse(JSON.stringify(res));
    });
  }
  getOrder() {
    this.orderService.getOrders().subscribe((data) => {
      this.orders = data.filter((x) => x.orderID == this.idOrder);
      this.order = this.orders[0];
      if (this.soluong != 0) {
        this.cameraService.getCameras().subscribe((data1) => {
          this.cameras = data1.filter((x1) => x1._id == this.selectedid);
          this.camera = this.cameras[0];
          this.khuyenmaiService.getKhuyenMais().subscribe((data2) => {
            this.khuyenmais = data2.filter((x2) => x2._id == this.idKhuyenMai);
            this.khuyenmai = this.khuyenmais[0];
            this.tienDatThue =
              this.soluong *
              this.camera.unitPrice *
              (1 - this.khuyenmai.voucherPrice * 0.01);
            this.tienDatCoc = this.tienDatThue * 0.5;
          });
        });
      } else {
        this.studioService.getStudios().subscribe((data1) => {
          this.studios = data1.filter((x1) => x1._id == this.selectedid);
          this.studio = this.studios[0];
          this.khuyenmaiService.getKhuyenMais().subscribe((data2) => {
            this.khuyenmais = data2.filter((x2) => x2._id == this.idKhuyenMai);
            this.khuyenmai = this.khuyenmais[0];
            this.tienDatThue =
              this.studio.unitPrice * (1 - this.khuyenmai.voucherPrice * 0.01);
            this.tienDatCoc = this.tienDatThue * 0.5;
          });
        });
      }
    });
  }

  minus(a: string) {
    var x = parseInt(a);
    var timeend = new Date(x).getTime();
    var today = new Date().getTime();
    var distance = timeend - today;
    var second = distance / 1000;
    return second;
  }
  config: CountdownConfig = {
    leftTime: 60 * 60 * 25,
    formatDate: ({ date, formatStr }) => {
      let duration = Number(date || 0);
      return CountdownTimeUnits.reduce((current, [name, unit]) => {
        if (current.indexOf(name) !== -1) {
          const v = Math.floor(duration / unit);
          duration -= v * unit;
          return current.replace(
            new RegExp(`${name}+`, 'g'),
            (match: string) => {
              return v.toString().padStart(match.length, '0');
            }
          );
        }
        return current;
      }, formatStr);
    },
  };
  openDialog() {
    this.dialog.open(DialogOverviewExampleDialog);
  }

  congdiem(){
    var diemcong = 0;
    this.userService.getUsers().subscribe((data2) => {
      this.users3 = data2.filter((x) => x._id == this.idUser);
      this.user3 = this.users3[0];
      if (this.tienDatThue < 500000) {
        diemcong += 1;
      } else if (this.tienDatThue >= 500000 && this.tienDatThue < 1000000) {
        diemcong += 2;
      } else if (this.tienDatThue >= 1000000 && this.tienDatThue < 2000000) {
        diemcong += 3;
      } else if (this.tienDatThue >= 2000000 && this.tienDatThue < 3000000) {
        diemcong += 5;
      } else if (this.tienDatThue >= 3000000 && this.tienDatThue < 5000000) {
        diemcong += 7;
      } else {
        diemcong += 10;
      }
      let pointcurrent = this.user3.userPoint + diemcong;
      var diemso: User = {
        _id: this.idUser,
        userPoint: parseInt(pointcurrent),
      };
      this.userService.patchUser(this.idUser, diemso).subscribe((res) => {
        let resData = JSON.parse(JSON.stringify(res));
        if (resData.message === 'success') {
          this.toast.success(
            'Bạn đã được cộng ' + diemcong + ' điểm tích luỹ',
            'Cộng điểm!'
          );
        }
      });
    })
  }

  thanhToan() {
    var time = Date.now();
    this.orderService.getOrders().subscribe((data) => {
      this.orders1 = data.filter((x) => x.orderID == this.idOrder);
      this.order1 = this.orders1[0];
      var order: Order = {
        _id: this.order1._id,
        status: 'Đã thanh toán',
        datePay: time.toString(),
        depositPrice: this.tienDatCoc,
      };
      this.orderService.patchOrder(this.order1._id, order).subscribe((res) => {
        let resData = JSON.parse(JSON.stringify(res));
        if (resData.message === 'success') {
          this.pushNoti();
          if (this.soluong != 0) {
            this.totalquantity = this.camera.quantity + this.quantity;
            var cam: Camera = {
              _id: this.selectedid,
              quantity: this.totalquantity,
            };
            this.cameraService
              .patchCam(this.selectedid, cam)
              .subscribe((res) => {
                let resData = JSON.parse(JSON.stringify(res));
                if (resData.message === 'success') {;
                } else {
                }
              });
          } else {
            this.totalquantity = this.studio.quantity + this.quantity;
            var stu: Studio = {
              _id: this.selectedid,
              quantity: this.totalquantity,
            };
            this.studioService
              .patchStu(this.selectedid, stu)
              .subscribe((res) => {
                let resData = JSON.parse(JSON.stringify(res));
                if (resData.message === 'success') {
                  
                } else {
                }
              });
          }
          this.congdiem();
          this.route.navigate(['/datthue', this.idUser, 'donhang']);
        } else {
          this.toast.error('Thanh toán lỗi', 'Thất bại!');
        }
      });
    });
  }
}
@Component({
  selector: 'dialog-elements-example-dialog1',
  template: `<div class="dialog">
    <div class="text-center">
      <i class="far fa-solid fa-circle-info fa-3x  text-warning"></i>
    </div>
    <h2 class="text-center" mat-dialog-title>Thông tin tài khoản</h2>
    <div mat-dialog-content>
      <div class="fw-bold">
        1. Thẻ ATM nội địa/Internet Banking (Hỗ trợ Internet Banking)
      </div>
      <div>STK: 4900565656999</div>
      <div class="fw-bold">2. Thanh toán bằng ví MoMo</div>
      <div>SĐT: 0123 456 789</div>
      <div class="text-danger">
        Lưu ý: Tách Studio chỉ áp dụng chuyển khoản qua 2 hình thức trên.
      </div>
      <hr />
      <div class="text-danger fw-bold">Cộng tích điểm</div>
      <ul>
        <li>Dưới 500.000 VNĐ: cộng 1 điểm tích lũy</li>
        <li>500.000 VNĐ đến < 1.000.000 VNĐ: cộng 2 điểm tích lũy</li>
        <li>1.000.000 VNĐ đến < 2.000.000 VNĐ: cộng 3 điểm tích lũy</li>
        <li>2.000.000 VNĐ đến < 3.000.000 VNĐ: cộng 5 điểm tích lũy</li>
        <li>3.000.000 VNĐ đến < 5.000.000 VNĐ: cộng 7 điểm tích lũy</li>
        <li>Trên 5.000.000 VNĐ: cộng 10 điểm tích lũy</li>
      </ul>
    </div>
  </div>`,
  styleUrls: ['/thanhtoan.component.css'],
})
export class DialogOverviewExampleDialog {}
