import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { customValidator, passValidator } from '../validators/check.validators';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAvatar } from '../models/userimg';

@Component({
  selector: 'app-taikhoan-canhan',
  templateUrl: './taikhoan-canhan.component.html',
  styleUrls: ['./taikhoan-canhan.component.css'],
})
export class TaikhoanCanhanComponent implements OnInit {
  idUser: any;
  user: User = new User();
  regForm!: FormGroup;
  users: any;
  userAvatar: any;
  avatar?: any;
  avatars: any;
  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private service: UserService,
    private activatedR: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedR.paramMap.subscribe((params) => {
      let idU = params.get('idU');
      this.idUser = idU;
    });
    this.getUser();
    this.regForm = this.formBuilder.group(
      {
        userName: [
          '',
          [
            Validators.required,
            Validators.minLength(1),
            customValidator(
              /\@|\#|\$|\&|\%|\*|\!|\^|\+|\-|\:|\;|\,|\.|\?|\`|\=|\(|\|\/|\<|\>\{|\}|\[|\]|\"|\'|\)|\~/g
            ),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        email: [
          '',
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
        gender: [''],
        dateOfBirth: [''],
        userAvatar: [''],
      },
      { validators: [passValidator] }
    );
  }
  get f() {
    return this.regForm!.controls;
  }
  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      this.userAvatar = event.target.files[0];
    }
  }
  getUser() {
    this.service.getUsers().subscribe((data1) => {
      this.users = data1.filter((x) => x._id == this.idUser);
      this.user = this.users[0];
      this.avatar = this.user.userAvatar;
    });
  }
  submitData(data: User) {
    if (this.regForm?.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('userAvatar', this.userAvatar);
    formData.append('userName', data.userName!);
    formData.append('password', data.password!);
    formData.append('gender', data.gender!);
    formData.append('dateOfBirth', data.dateOfBirth!);
    formData.append('phone', data.phone!);
    formData.append('email', data.email!);
    this.service.updateAvatar(this.idUser, formData).subscribe((res) => {
      let resData = JSON.parse(JSON.stringify(res));
      if (resData.message === 'success') {
        this.toast.success('Updated successfully!', 'Success!');
      } else {
        this.toast.success(resData.message, 'Error');
      }
    });
  }
  logOut() {
    localStorage.setItem('_id', '');
    localStorage.setItem('typeUser', '');
    this.router.navigate(['/homepage']);
  }
  thongbao() {
    this.router.navigate(['/thongbao']);
  }
  khuyenmai() {
    this.router.navigate(['/khuyenmai', this.idUser]);
  }
  datthue() {
    this.router.navigate(['/datthue', this.idUser, 'donhang']);
  }
  myAccount() {
    this.router.navigate(['/user', this.idUser]);
  }
}
