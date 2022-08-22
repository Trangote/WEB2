import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my_client';
  idUser: any;
  typeUser: any;
  user: any;
  admin: any;
  adminAvatar: any;

  constructor(private activatedR: ActivatedRoute, private route: Router,    private toast: ToastrService,) {}
  ngOnInit(): void {
    this.idUser = localStorage.getItem('_id')?.replace(/"/g, '');
    this.typeUser = localStorage.getItem('typeUser')?.replace(/"/g, '');
    if (this.typeUser == 'admin') {
      this.admin = 'admin';
    } else {
      this.user = 'user';
    }
  }
  getUser() {
    if (this.idUser == undefined || this.idUser == '') {
      this.route.navigate(['/signin']);
    } else  {
      this.route.navigate(['/user', this.idUser]);
    }
  }
  Logout(){
    localStorage.setItem('_id', '');
    localStorage.setItem('typeUser', '');
    this.toast.success('Logout successfully!', 'Success!');
    this.admin = '';
    this.user = 'user';
    this.route.navigate(['/homepage']);
 
  }
}
