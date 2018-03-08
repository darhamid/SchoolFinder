import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindschoolsViewComponent } from './findschools-view.component';

describe('FindschoolsViewComponent', () => {
  let component: FindschoolsViewComponent;
  let fixture: ComponentFixture<FindschoolsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindschoolsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindschoolsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
