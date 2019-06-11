import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacidadePage } from './privacidade.page';

describe('PrivacidadePage', () => {
  let component: PrivacidadePage;
  let fixture: ComponentFixture<PrivacidadePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacidadePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacidadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
