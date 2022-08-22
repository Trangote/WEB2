import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadStudioComponent } from './upload-studio.component';

describe('UploadStudioComponent', () => {
  let component: UploadStudioComponent;
  let fixture: ComponentFixture<UploadStudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadStudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadStudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
