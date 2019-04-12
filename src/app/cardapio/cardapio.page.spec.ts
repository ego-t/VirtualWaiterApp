import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardapioPage } from './cardapio.page';

describe('CardapioPage', () => {
  let component: CardapioPage;
  let fixture: ComponentFixture<CardapioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardapioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardapioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
