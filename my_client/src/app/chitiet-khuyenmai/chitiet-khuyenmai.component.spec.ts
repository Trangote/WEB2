import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietKhuyenmaiComponent } from './chitiet-khuyenmai.component';

describe('ChitietKhuyenmaiComponent', () => {
  let component: ChitietKhuyenmaiComponent;
  let fixture: ComponentFixture<ChitietKhuyenmaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChitietKhuyenmaiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietKhuyenmaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
