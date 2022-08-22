import { Component, OnInit } from '@angular/core';
import { KhuyenmaiService } from '../services/khuyenmai.service';
import { KhuyenMai } from '../models/khuyenmai';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-khuyenmai',
  templateUrl: './khuyenmai.component.html',
  styleUrls: ['./khuyenmai.component.css'],
})
export class KhuyenmaiComponent implements OnInit {
  khuyenmais?: KhuyenMai[];
  khuyenmailoc?: KhuyenMai[];
  khuyenmai: any;
  users?: User[];
  user: any;
  errMessage: any;
  diemcon: any;
  idUser: any;
  selectedid: any;
  soluong: any;
  avatar?: any;
  constructor(
    private khuyenmaiService: KhuyenmaiService,
    private activatedR: ActivatedRoute,
    private route: Router,
    private userService: UserService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedR.paramMap.subscribe((params) => {
      let idP = params.get('idP');
      let idU = params.get('idU');
      let soluong = params.get('soluong');
      this.idUser = idU;
      this.soluong = soluong;
      if (idP != null) {
        this.selectedid = idP;
      }
    });
    this.loadKhuyenMais();
    this.loadUser();
  }
  loadKhuyenMais() {
    this.khuyenmaiService.getKhuyenMais().subscribe({
      next: (data) => (this.khuyenmais = data),
      error: (err) => (this.errMessage = err),
    });
  }
  doiDiemKhuyenMai(id: any) {
    this.khuyenmaiService.getKhuyenMais().subscribe((data) => {
      this.khuyenmailoc = data.filter((x) => x._id == id);
      this.khuyenmai = this.khuyenmailoc[0];
    });
    if (this.selectedid) {
      if (parseInt(this.user.userPoint) >= this.khuyenmai.voucherPoint) {
        this.toast.success('Đổi voucher thành công', 'Thành công!');
        if (this.soluong != 0) {
          this.route.navigate([
            '/datthue',
            this.idUser,
            this.selectedid,
            this.soluong,
            'khuyenmai',
            id,
          ]);
        } else {
          this.route.navigate([
            '/datthue',
            this.idUser,
            this.selectedid,
            0,
            'khuyenmai',
            id,
          ]);
        }
      } else {
        this.toast.error('Điểm không đủ để đổi Voucher', 'Thất bại!');
      }
    } else {
      this.toast.error('Bạn phải đặt thuê để được đổi điểm!', 'Thất bại!');
    }
  }
  loadUser() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data.filter((x) => x._id == this.idUser);
      this.user = this.users[0];
      this.avatar = this.user.userAvatar;
    });
  }
  dieukienkhuyenmai(v: KhuyenMai) {
    if (this.soluong == undefined || this.soluong == null) {
      this.route.navigate(['/khuyenmai', this.idUser, 'voucherdetail', v._id]);
    } else if (this.soluong != 0) {
      this.route.navigate([
        '/voucherdetail',
        this.idUser,
        this.selectedid,
        this.soluong,
        v._id,
      ]);
    } else {
      this.route.navigate([
        '/voucherdetail',
        this.idUser,
        this.selectedid,
        0,
        v._id,
      ]);
    }
  }
  logOut() {
    localStorage.setItem('_id', '');
    localStorage.setItem('typeUser', '');
    this.router.navigate(['/homepage']);
  }
  khuyenmai1() {
    this.router.navigate(['/khuyenmai', this.idUser]);
  }
  datthue() {
    this.router.navigate(['/datthue', this.idUser, 'donhang']);
  }
  myAccount() {
    this.router.navigate(['/user', this.idUser]);
  }
  thongbao() {
    this.router.navigate(['/thongbao']);
  }
}
