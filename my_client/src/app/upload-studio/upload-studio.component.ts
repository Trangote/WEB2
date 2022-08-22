import { Component, OnInit } from '@angular/core';
import { AbstractControl, NgForm } from '@angular/forms';
import { Studio } from '../models/studio';
import { StudioService } from '../services/studio.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { customValidator } from '../validators/check.validators';
@Component({
  selector: 'app-upload-studio',
  templateUrl: './upload-studio.component.html',
  styleUrls: ['./upload-studio.component.css'],
})
export class UploadStudioComponent implements OnInit {
  imgProduct1: any = null;
  imgProduct2: any = null;
  imgProduct3: any = null;
  imgProduct4: any = null;
  studio: Studio = new Studio();
  regForm!: FormGroup;
  constructor(
    private _service: StudioService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.regForm = this.formBuilder.group({
      quantity: [0],
      productName: ['', 
      [
        Validators.required,
        Validators.minLength(4),
        customValidator(/\@|\#|\$|\&|\%|\*|\!|\^|\+|\-|\:|\;|\,|\.|\?|\`|\=|\(|\|\/|\<|\>\{|\}|\[|\]|\"|\'|\)|\~/g),
      ]],
      unitPrice: [0, Validators.required],
      style: ['', Validators.required],
      album: ['', Validators.required],
      imgProduct1: [''],
      imgProduct2: [''],
      imgProduct3: [''],
      imgProduct4: [''],
      productDescription: ['', [Validators.required, Validators.minLength(50)]],
    });
  }
  get f() {
    return this.regForm!.controls;
  }
  onSelectFile1(event: any) {
    if (event.target.files.length > 0) {
      this.imgProduct1 = event.target.files[0];
    } else {
      this.imgProduct1 = null;
    }
  }
  onSelectFile2(event: any) {
    if (event.target.files.length > 0) {
      this.imgProduct2 = event.target.files[0];
    } else {
      this.imgProduct2 = null;
    }
  }
  onSelectFile3(event: any) {
    if (event.target.files.length > 0) {
      this.imgProduct3 = event.target.files[0];
    } else {
      this.imgProduct3 = null;
    }
  }
  onSelectFile4(event: any) {
    if (event.target.files.length > 0) {
      this.imgProduct4 = event.target.files[0];
    } else {
      this.imgProduct4 = null;
    }
  }
  submitData(data: any) {
    if (this.regForm?.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('productName', data.productName);
    formData.append('unitPrice', data.unitPrice);
    formData.append('quantity', data.quantity);
    formData.append('style', data.style);
    formData.append('album', data.album);
    formData.append('imgProduct1', this.imgProduct1);
    formData.append('imgProduct2', this.imgProduct2);
    formData.append('imgProduct3', this.imgProduct3);
    formData.append('imgProduct4', this.imgProduct4);
    formData.append('productDescription', data.productDescription);
    this._service.uploadData(formData).subscribe({
      next: (res) => {
        let resData = JSON.parse(JSON.stringify(res));
        if (resData.message === 'success') {
        } else {
        }
      },
      error: (err) => {
        console.log('Error', err.message);
      },
    });
  }
}
