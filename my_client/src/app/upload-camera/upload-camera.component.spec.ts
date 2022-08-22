import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCameraComponent } from './upload-camera.component';

describe('UploadCameraComponent', () => {
  let component: UploadCameraComponent;
  let fixture: ComponentFixture<UploadCameraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCameraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
