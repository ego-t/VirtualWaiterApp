import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCardapioPage } from './item-cardapio.page';

describe('ItemCardapioPage', () => {
  let component: ItemCardapioPage;
  let fixture: ComponentFixture<ItemCardapioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCardapioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCardapioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
