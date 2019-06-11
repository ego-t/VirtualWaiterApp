import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermosDeUsoPage } from './termos-de-uso.page';

describe('TermosDeUsoPage', () => {
  let component: TermosDeUsoPage;
  let fixture: ComponentFixture<TermosDeUsoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermosDeUsoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermosDeUsoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
