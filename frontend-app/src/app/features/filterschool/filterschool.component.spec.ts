import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterschoolComponent } from './filterschool.component';

describe('FilterschoolComponent', () => {
  let component: FilterschoolComponent;
  let fixture: ComponentFixture<FilterschoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterschoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterschoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
