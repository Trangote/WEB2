import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StudioService } from '../services/studio.service';
import { CameraService } from '../services/camera.service';
import { Studio } from './../models/studio';
import { Camera } from './../models/camera';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { customValidator } from '../validators/check.validators';

@Component({
  selector: 'app-update-studio',
  templateUrl: './update-studio.component.html',
  styleUrls: ['./update-studio.component.css'],
})
export class UpdateStudioComponent implements OnInit {
  regForm!: FormGroup;
  studio: Studio = new Studio();
  errMessage?: string;
  stt = 0;
  studios: any;
  cameras: any;
  demStudio = 0;
  demCamera = 0;
  tong = 0;
  imgProduct1: any = null;
  imgProduct2: any = null;
  imgProduct3: any = null;
  imgProduct4: any = null;

  constructor(
    private service: StudioService,
    private toast: ToastrService,
    private camService: CameraService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllProduct();
    this.getAllCam();
    this.regForm = this.formBuilder.group({
      productName: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          customValidator(
            /\@|\#|\$|\&|\%|\*|\!|\^|\+|\-|\:|\;|\,|\.|\?|\`|\=|\(|\|\/|\<|\>\{|\}|\[|\]|\"|\'|\)|\~/g
          ),
        ],
      ],
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
  getAllProduct() {
    this.service.getStudios().subscribe({
      next: (data: any) => (
        (this.studios = data),
        (this.demStudio = this.studios.length),
        (this.tong += this.demStudio)
      ),
      error: (err) => (this.errMessage = err),
    });
  }
  getAllCam() {
    this.camService.getCameras().subscribe({
      next: (data: any) => (
        (this.cameras = data),
        (this.demCamera = this.cameras.length),
        (this.tong += this.demCamera)
      ),
      error: (err) => (this.errMessage = err),
    });
  }
  getById(a: any) {
    this.service.getByIdStu(a);
  }
  deleteProduct(id: any, form: NgForm) {
    if (confirm('Are you want to delete this product?') == true) {
      this.service.deleteProduct(id).subscribe((res) => {
        let resData = JSON.parse(JSON.stringify(res));
        if (resData.message === 'success') {
          this.toast.success('Deleted successfully!', 'Success!');
          this.onReset(form);
          this.getAllProduct();
          this.getAllCam();
        } else {
          this.toast.success(resData.message, 'Error');
        }
      });
    }
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
  onReset(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.studio = new Studio();
  }
  patchProduct(data: Studio) {
    this.studio = data;
    this.regForm.patchValue({
      productName: this.studio.productName,
      unitPrice: this.studio.unitPrice,
      style: this.studio.style,
      album: this.studio.album,
      productDescription: this.studio.productDescription
    });
  }
  submitData(data: Studio) {
    if (this.regForm?.invalid) {
      return;
    }
    let price = data.unitPrice!.toString();
    const formData = new FormData();
    formData.append('productName', data.productName!);
    formData.append('unitPrice', price);
    formData.append('style', data.style!);
    formData.append('album', data.album!);
    formData.append('productDescription', data.productDescription!);
    formData.append('imgProduct1', this.imgProduct1);
    formData.append('imgProduct2', this.imgProduct2);
    formData.append('imgProduct3', this.imgProduct3);
    formData.append('imgProduct4', this.imgProduct4);
    this.service.patchStu(this.studio._id, formData).subscribe((res) => {
      let resData = JSON.parse(JSON.stringify(res));
      if (resData.message === 'success') {
        this.getAllProduct();
        this.toast.success('Updated successfully!', 'Success!');
      } else {
        this.toast.success(resData.message, 'Error');
      }
    });
  }
}
