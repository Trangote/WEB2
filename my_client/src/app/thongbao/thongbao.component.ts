import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Notification } from '../models/notification';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-thongbao',
  templateUrl: './thongbao.component.html',
  styleUrls: ['./thongbao.component.css']
})
export class ThongbaoComponent implements OnInit {
  users: Array<User> = [];
  thongbao: Array<Notification> = [];
  user: any;
  idUser: any;
  avatar?: any;
  
  constructor(
    private service: UserService,
    private activatedR: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.idUser = localStorage.getItem('_id')?.replace(/"/g, '');
    this.getUser();
  }
  getUser() {
    this.service.getUsers().subscribe((data1) => {
      this.users = data1.filter((x) => x._id == this.idUser);
      this.user = this.users[0];
      this.avatar = this.user.userAvatar;
      if(this.users[0]){
        this.thongbao = this.user.notifications;
      }
    });
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
  thongbao1(){
    this.router.navigate(['/thongbao']);
  }
}
