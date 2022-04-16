import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogGtComponent } from './blog-gt.component';

describe('BlogGtComponent', () => {
  let component: BlogGtComponent;
  let fixture: ComponentFixture<BlogGtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogGtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogGtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
