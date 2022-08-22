import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogIntroComponent } from './blog-intro.component';

describe('BlogIntroComponent', () => {
  let component: BlogIntroComponent;
  let fixture: ComponentFixture<BlogIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogIntroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
