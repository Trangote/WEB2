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

@NgModule({
  declarations: [
    AppComponent,
    KhuyenmaiComponent,
    ThongbaoComponent,
    TaikhoanCanhanComponent,
    PageNotFoundComponent
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
