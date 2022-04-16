import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatthueComponent } from './datthue.component';

describe('DatthueComponent', () => {
  let component: DatthueComponent;
  let fixture: ComponentFixture<DatthueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatthueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatthueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
