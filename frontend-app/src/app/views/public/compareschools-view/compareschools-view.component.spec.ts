import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareschoolsViewComponent } from './compareschools-view.component';

describe('CompareschoolsViewComponent', () => {
  let component: CompareschoolsViewComponent;
  let fixture: ComponentFixture<CompareschoolsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareschoolsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareschoolsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
