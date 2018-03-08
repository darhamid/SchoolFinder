import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchooldetailsViewComponent } from './schooldetails-view.component';

describe('SchooldetailsViewComponent', () => {
  let component: SchooldetailsViewComponent;
  let fixture: ComponentFixture<SchooldetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchooldetailsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchooldetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
