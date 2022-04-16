import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogAllPostComponent } from './blog-all-post.component';

describe('BlogAllPostComponent', () => {
  let component: BlogAllPostComponent;
  let fixture: ComponentFixture<BlogAllPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogAllPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogAllPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
