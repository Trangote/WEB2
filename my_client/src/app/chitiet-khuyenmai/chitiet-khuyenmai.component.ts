import { Component, OnInit } from '@angular/core';
import { KhuyenmaiService } from '../services/khuyenmai.service';
import { KhuyenMai } from '../models/khuyenmai';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chitiet-khuyenmai',
  templateUrl: './chitiet-khuyenmai.component.html',
  styleUrls: ['./chitiet-khuyenmai.component.css'],
})
export class ChitietKhuyenmaiComponent implements OnInit {
  idUser: any;
  selectedid: any;
  soluong: any;
  khuyenmailoc?: KhuyenMai[];
  khuyenmai: any;
  idKM: any;
  isDisable: boolean = false;

  constructor(
    private khuyenmaiService: KhuyenmaiService,
    private activatedR: ActivatedRoute,
    private route: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.activatedR.paramMap.subscribe((params) => {
      let idP = params.get('idP');
      let idU = params.get('idU');
      let soluong = params.get('soluong');
      let idKM = params.get('idKM');
      this.idKM = idKM;
      this.idUser = idU;
      this.soluong = soluong;
      if (idP != null) {
        this.selectedid = idP;
      }
    });
    this.chitietkhuyenmai();
    this.checkdisable();
  }
  chitietkhuyenmai() {
    this.khuyenmaiService.getKhuyenMais().subscribe((data) => {
      this.khuyenmailoc = data.filter((x) => x._id == this.idKM);
      this.khuyenmai = this.khuyenmailoc[0];
    });
  }
  onDisabled() {
    this.isDisable = !this.isDisable;
  }
  checkdisable() {
    if (this.soluong == undefined || this.soluong == null) {
      this.onDisabled();
    }
  }
  doivoucher() {
    if (this.soluong != 0) {
      this.route.navigate([
        '/datthue',
        this.idUser,
        this.selectedid,
        this.soluong,
        'khuyenmai',
        this.idKM,
      ]);
    } else {
      this.route.navigate([
        '/datthue',
        this.idUser,
        this.selectedid,
        0,
        'khuyenmai',
        this.idKM,
      ]);
    }
  }
  huykhuyenmai() {
    if(this.soluong == undefined || this.soluong == null){
     this.route.navigate(['/khuyenmai', this.idUser]);
    }
    if (this.soluong != 0) {
      this.route.navigate([
        '/datthue',
        this.idUser,
        this.selectedid,
        this.soluong,
        'khuyenmai',
      ]);
    } else {
      this.route.navigate([
        '/datthue',
        this.idUser,
        this.selectedid,
        0,
        'khuyenmai',
      ]);
    }
  }
}
