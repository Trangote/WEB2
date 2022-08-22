import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UploadCameraComponent } from './upload-camera/upload-camera.component';
import { UploadStudioComponent } from './upload-studio/upload-studio.component';
import { StudioListComponent } from './studio-list/studio-list.component';
import { CameraListComponent } from './camera-list/camera-list.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BlogAllPostComponent } from './blog-all-post/blog-all-post.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { UpdateStudioComponent } from './update-studio/update-studio.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { DatthueComponent } from './datthue/datthue.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { KhuyenmaiComponent } from './khuyenmai/khuyenmai.component';
import { UpdateCameraComponent } from './update-camera/update-camera.component';
import { TaikhoanCanhanComponent } from './taikhoan-canhan/taikhoan-canhan.component';
import { ThanhtoanComponent } from './thanhtoan/thanhtoan.component';
import { DonhangComponent } from './donhang/donhang.component';
import { AlbumComponent } from './album/album.component';
import { ChitietKhuyenmaiComponent } from './chitiet-khuyenmai/chitiet-khuyenmai.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ThongbaoComponent } from './thongbao/thongbao.component';
import { HoantatComponent } from './hoantat/hoantat.component';
import { BlogIntroComponent } from './blog-intro/blog-intro.component';

const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'blogintro', component: BlogIntroComponent },
  { path: 'user', component: TaikhoanCanhanComponent },
  { path: 'upcam', component: UploadCameraComponent },
  { path: 'upstu', component: UploadStudioComponent },
  { path: 'studiolist', component: StudioListComponent },
  { path: 'cameralist', component: CameraListComponent },
  { path: 'updatestu', component: UpdateStudioComponent },
  { path: 'updatecam', component: UpdateCameraComponent },
  { path: 'blogallpost', component: BlogAllPostComponent },
  { path: 'albumlist', component: AlbumListComponent },
  { path: 'updatestudio', component: UpdateStudioComponent },
  { path: 'thongbao', component: ThongbaoComponent },
  { path: 'khuyenmai/:idU', component: KhuyenmaiComponent },
  { path: 'homepage/:id', component: HomepageComponent },
  { path: 'productdetails/:idU/:idP', component: ProductDetailsComponent },
  { path: 'datthue/:idU/:idP/:soluong', component: DatthueComponent },
  {
    path: 'datthue/:idU/:idP/:soluong/khuyenmai',
    component: KhuyenmaiComponent,
  },
  {
    path: 'datthue/:idU/:idP/:soluong/khuyenmai/:idKM',
    component: DatthueComponent,
  },
  {
    path: 'datthue/:idU/:idP/:soluong/:idKM/thanhtoan/:idOrder',
    component: ThanhtoanComponent,
  },
  {
    path: 'donhang/:idU/:idOrder',
    component: HoantatComponent,
  },
  {
    path: 'datthue/:idU/donhang',
    component: DonhangComponent,
  },
  {
    path: 'album/:idA',
    component: AlbumComponent,
  },
  {
    path: 'user/:idU',
    component: TaikhoanCanhanComponent,
  },
  { path: 'blogdetail/:idB', component: BlogDetailComponent },
  {
    path: 'voucherdetail/:idU/:idP/:soluong/:idKM',
    component: ChitietKhuyenmaiComponent,
  },
  {
    path: 'khuyenmai/:idU/voucherdetail/:idKM',
    component: ChitietKhuyenmaiComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
