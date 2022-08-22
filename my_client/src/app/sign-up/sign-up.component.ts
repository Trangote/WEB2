import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { User } from '../models/user';
import { customValidator, passValidator } from '../validators/check.validators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User = new User();
  regForm!: FormGroup;

  constructor(private _service: UserService, private formBuilder: FormBuilder, private router: Router, private _toast: ToastrService) { }

  ngOnInit(): void {
    this.regForm = this.formBuilder.group({
      userName: ['', 
      [
        Validators.required,
        Validators.minLength(1),
        customValidator(/\@|\#|\$|\&|\%|\*|\!|\^|\+|\-|\:|\;|\,|\.|\?|\`|\=|\(|\|\/|\<|\>\{|\}|\[|\]|\"|\'|\)|\~/g),
      ]],
      password:['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      confirmPass:['', Validators.required],
      fullName: ['', 
      [
        Validators.required,
        Validators.minLength(1),
        customValidator(/\@|\#|\$|\&|\%|\*|\!|\^|\+|\-|\:|\;|\,|\.|\?|\`|\=|\(|\|\/|\<|\>\{|\}|\[|\]|\"|\'|\)|\~/g),
      ]],
      phone: ['', 
      [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]],
    },
    
    { validators: [passValidator] });
  }
  get f() {
    return this.regForm!.controls;
  }
  submitData() {
    if (this.regForm?.invalid) {
      return;
    }
    this._service.postUser(this.regForm.value).subscribe((res) => {
      let resData = JSON.parse(JSON.stringify(res));
      if (resData.message === 'success') {
        this._toast.success('Sign up successfully!', 'Success!');
        this.router.navigate(['/signin']);
      } else {
        this._toast.error('Sign up failed!', 'Failed!');
      }
    });
  }
}
