import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UpdateStudioComponent } from './update-studio/update-studio.component';
import { UpdateCameraComponent } from './update-camera/update-camera.component';
import { UploadCameraComponent } from './upload-camera/upload-camera.component';
import { UploadStudioComponent } from './upload-studio/upload-studio.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BlogIntroComponent } from './blog-intro/blog-intro.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogAllPostComponent } from './blog-all-post/blog-all-post.component';
import { KhuyenmaiComponent } from './khuyenmai/khuyenmai.component';
import { TaikhoanCanhanComponent } from './taikhoan-canhan/taikhoan-canhan.component';
import { ThongbaoComponent } from './thongbao/thongbao.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StudioListComponent } from './studio-list/studio-list.component';
import { CameraListComponent } from './camera-list/camera-list.component';
import { AlbumComponent } from './album/album.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { ThanhtoanComponent } from './thanhtoan/thanhtoan.component';
import { DatthueComponent } from './datthue/datthue.component';
import { DonhangComponent } from './donhang/donhang.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatDialogModule } from '@angular/material/dialog';
import {
  CountdownModule,
  CountdownEvent,
  CountdownConfig,
} from 'ngx-countdown';
import { ChitietKhuyenmaiComponent } from './chitiet-khuyenmai/chitiet-khuyenmai.component';
import { HoantatComponent } from './hoantat/hoantat.component';

@NgModule({
  declarations: [
    AppComponent,
    UpdateStudioComponent,
    UpdateCameraComponent,
    UploadCameraComponent,
    UploadStudioComponent,
    HomepageComponent,
    ProductDetailsComponent,
    SignInComponent,
    SignUpComponent,
    BlogIntroComponent,
    BlogDetailComponent,
    BlogAllPostComponent,
    KhuyenmaiComponent,
    TaikhoanCanhanComponent,
    ThongbaoComponent,
    PageNotFoundComponent,
    StudioListComponent,
    CameraListComponent,
    AlbumComponent,
    AlbumListComponent,
    ThanhtoanComponent,
    DatthueComponent,
    DonhangComponent,
    ChitietKhuyenmaiComponent,
    HoantatComponent,
  ],
  imports: [
    BrowserModule,
    CountdownModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    MatDialogModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
