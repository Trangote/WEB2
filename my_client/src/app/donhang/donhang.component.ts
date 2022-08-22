import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../models/order';
import { User } from '../models/user';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-donhang',
  templateUrl: './donhang.component.html',
  styleUrls: ['./donhang.component.css'],
})
export class DonhangComponent implements OnInit {
  idUser: any;
  idOrder: any;
  selectedid: any;
  user?: any;
  users?: User[];
  errorMessage: any;
  orders?: any;
  avatar?: any;
  constructor(
    private activatedR: ActivatedRoute,
    private userService: UserService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedR.paramMap.subscribe((params) => {
      let idU = params.get('idU');
      this.idUser = idU;
    });
    this.getUser();
    this.getOrder();
  }

  getOrder() {
    this.orderService.getOrders().subscribe((data) => {
      this.orders = data.filter((x) => x.userID == this.idUser);
    });
  }
  getUser() {
    this.userService.getUsers().subscribe((data1) => {
      this.users = data1.filter((x) => x._id == this.idUser);
      this.user = this.users[0];
      this.avatar = this.user.userAvatar;
    });
  }
  viewOrder(p: Order) {
    this.router.navigate(['/donhang', this.idUser, p._id]);
  }
  logOut(){
    localStorage.setItem('_id','');
    localStorage.setItem('typeUser','');
    this.router.navigate(['/homepage']);
  }
  khuyenmai(){
    this.router.navigate(['/khuyenmai', this.idUser]);
  }
  datthue(){
    this.router.navigate(['/datthue', this.idUser,'donhang']);
  }
  myAccount(){
    this.router.navigate(['/user', this.idUser]);
  }
  thongbao(){
    this.router.navigate(['/thongbao']);
  }

}
