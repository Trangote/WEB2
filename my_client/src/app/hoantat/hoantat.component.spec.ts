import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoantatComponent } from './hoantat.component';

describe('HoantatComponent', () => {
  let component: HoantatComponent;
  let fixture: ComponentFixture<HoantatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoantatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoantatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
