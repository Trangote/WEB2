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

@Component({
  selector: 'app-hoantat',
  templateUrl: './hoantat.component.html',
  styleUrls: ['./hoantat.component.css'],
})
export class HoantatComponent implements OnInit {
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
    private activatedR: ActivatedRoute,
    private route: Router,
    private toast: ToastrService,
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.activatedR.paramMap.subscribe((params) => {
      let idOrder = params.get('idOrder');
      let idU = params.get('idU');
      this.idUser = idU;
      this.idOrder = idOrder;
    });
    this.getOrder();
  }

  getOrder() {
    this.orderService.getOrders().subscribe((data) => {
      this.orders = data.filter((x) => x._id == this.idOrder);
      this.order = this.orders[0];
      this.tienDatThue = this.order.depositPrice * 2;
    });
  }
  back(){
    this.route.navigate(['/datthue', this.idUser, 'donhang']);
  }
}
