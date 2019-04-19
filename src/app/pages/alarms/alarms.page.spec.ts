import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmsPage } from './alarms.page';

describe('AlarmsPage', () => {
  let component: AlarmsPage;
  let fixture: ComponentFixture<AlarmsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
