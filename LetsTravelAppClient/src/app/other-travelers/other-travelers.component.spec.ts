import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherTravelersComponent } from './other-travelers.component';

describe('OtherTravelersComponent', () => {
  let component: OtherTravelersComponent;
  let fixture: ComponentFixture<OtherTravelersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherTravelersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherTravelersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
