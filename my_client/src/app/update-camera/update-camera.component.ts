import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CameraService } from '../services/camera.service';
import { StudioService } from '../services/studio.service';
import { Camera } from '../models/camera';
import { Studio } from './../models/studio';
import { customValidator } from '../validators/check.validators';
@Component({
  selector: 'app-update-camera',
  templateUrl: './update-camera.component.html',
  styleUrls: ['./update-camera.component.css'],
})
export class UpdateCameraComponent implements OnInit {
  imgProduct1: any = null;
  imgProduct2: any = null;
  imgProduct3: any = null;
  imgProduct4: any = null;
  regForm!: FormGroup;
  errMessage?: string;
  stt = 0;
  cameras: any;
  studios: any;
  demStudio = 0;
  demCamera = 0;
  tong = 0;
  camera: Camera = new Camera();
  product: Camera = new Camera();
  constructor(
    private service: CameraService,
    private toast: ToastrService,
    private stuService: StudioService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllProduct();
    this.getAllStu();
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
      brand: ['', Validators.required],
      type: ['', Validators.required],
      origin: [
        '',
        [
          Validators.required,
          customValidator(
            /\@|\#|\$|\&|\%|\*|\!|\^|\+|\-|\:|\;|\,|\.|\?|\`|\=|\(|\|\/|\<|\>\{|\}|\[|\]|\"|\'|\)|\~/g
          ),
        ],
      ],
      model: [
        '',
        [
          Validators.required,
          customValidator(
            /\@|\#|\$|\&|\%|\*|\!|\^|\+|\-|\:|\;|\,|\.|\?|\`|\=|\(|\|\/|\<|\>\{|\}|\[|\]|\"|\'|\)|\~/g
          ),
        ],
      ],
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
  async getAllProduct() {
    let a = this.service.getCameras();
    await a.subscribe((data) => {
      this.cameras = data;
      this.demCamera = this.cameras.length;
      this.tong += this.demCamera;
    });
  }
  getAllStu() {
    this.stuService.getStudios().subscribe({
      next: (data: any) => (
        (this.studios = data),
        (this.demStudio = this.studios.length),
        (this.tong += this.demStudio)
      ),
      error: (err) => (this.errMessage = err),
    });
  }
  getById(a: any) {
    this.service.getByIdCam(a);
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
  patchProduct(data: Camera) {
    this.product = data;
    this.regForm.patchValue({
      productName: this.product.productName,
      unitPrice: this.product.unitPrice,
      brand: this.product.brand,
      type: this.product.type,
      origin: this.product.origin,
      model: this.product.model,
      productDescription: this.product.productDescription,
    });
  }
  deleteProduct(id: any, form: FormBuilder) {
    if (confirm('Are you want to delete this product?') == true) {
      this.service.deleteProduct(id).subscribe((res) => {
        let resData = JSON.parse(JSON.stringify(res));
        if (resData.message === 'success') {
          this.toast.success('Deleted successfully!', 'Success!');
          this.getAllProduct();
          this.getAllStu();
        } else {
          this.toast.success(resData.message, 'Error');
        }
      });
    }
  }
  submitData(data: Camera) {
    if (this.regForm?.invalid) {
      return;
    }
    let price = data.unitPrice!.toString();
    const formData = new FormData();
    formData.append('productName', data.productName!);
    formData.append('unitPrice', price);
    formData.append('brand', data.brand!);
    formData.append('type', data.type!);
    formData.append('origin', data.origin!);
    formData.append('model', data.model!);
    formData.append('productDescription', data.productDescription!);
    formData.append('imgProduct1', this.imgProduct1);
    formData.append('imgProduct2', this.imgProduct2);
    formData.append('imgProduct3', this.imgProduct3);
    formData.append('imgProduct4', this.imgProduct4);
    this.service.patchCam(this.product._id, formData).subscribe((res) => {
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
