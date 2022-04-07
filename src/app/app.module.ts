import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KhuyenmaiComponent } from './khuyenmai/khuyenmai.component';
import { ThongbaoComponent } from './thongbao/thongbao.component';
import { TaikhoanCanhanComponent } from './taikhoan-canhan/taikhoan-canhan.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { TachStudioComponent } from './tach-studio/tach-studio.component';
import { BlogAllPostComponent } from './blog-all-post/blog-all-post.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogGtComponent } from './blog-gt/blog-gt.component';
import { DangKyComponent } from './dang-ky/dang-ky.component';
import { DangNhapComponent } from './dang-nhap/dang-nhap.component';
import { DatthueComponent } from './datthue/datthue.component';
import { ThanhtoanComponent } from './thanhtoan/thanhtoan.component';
import { DonhangComponent } from './donhang/donhang.component';
import { AlbumComponent } from './album/album.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { CameraListComponent } from './camera-list/camera-list.component';
import { StudioListComponent } from './studio-list/studio-list.component';

@NgModule({
  declarations: [
    AppComponent,
    KhuyenmaiComponent,
    ThongbaoComponent,
    TaikhoanCanhanComponent,
    PageNotFoundComponent,
    HomepageComponent,
    ProductDetailsComponent,
    TachStudioComponent,
    BlogAllPostComponent,
    BlogDetailComponent,
    BlogGtComponent,
    DangKyComponent,
    DangNhapComponent,
    DatthueComponent,
    ThanhtoanComponent,
    DonhangComponent,
    AlbumComponent,
    AlbumListComponent,
    CameraListComponent,
    StudioListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
