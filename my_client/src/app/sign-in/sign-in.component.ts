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
import { Router } from '@angular/router';
import { customValidator, passValidator } from '../validators/check.validators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  user: User = new User();
  users?: User[];
  errMessage: any;
  submitted: boolean = false;
  form: FormGroup = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          customValidator(/\@|\#|\$|\&|\%|\*|\!|\^|\+|\-|\:|\;|\,|\.|\?|\`|\=|\(|\|\/|\<|\>\{|\}|\[|\]|\"|\'|\)|\~/g),
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
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(e?: any, p?: any): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
      this.userService.getUsers().subscribe((data) => {
        this.users = data.filter(
          (x) => x.userName == e.value && x.password == p.value
        );
        this.user = this.users[0];
        if (this.user) {
          this._toast.success('Login successfully!', 'Success!');
          this.router.navigate(['/homepage', this.user._id]);
          localStorage.setItem('_id', this.user._id);
          localStorage.setItem('typeUser', this.user.typeUser!);
        } else {
          this._toast.error('Login failed!', 'Fail!');
        }
      });
    }
  }
  dangKy() { 
    this.router.navigate(['/signup']);
   } 

}
