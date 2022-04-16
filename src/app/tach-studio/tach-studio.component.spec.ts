import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TachStudioComponent } from './tach-studio.component';

describe('TachStudioComponent', () => {
  let component: TachStudioComponent;
  let fixture: ComponentFixture<TachStudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TachStudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TachStudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
