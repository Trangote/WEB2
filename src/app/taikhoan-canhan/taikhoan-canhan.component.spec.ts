import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaikhoanCanhanComponent } from './taikhoan-canhan.component';

describe('TaikhoanCanhanComponent', () => {
  let component: TaikhoanCanhanComponent;
  let fixture: ComponentFixture<TaikhoanCanhanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaikhoanCanhanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaikhoanCanhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
