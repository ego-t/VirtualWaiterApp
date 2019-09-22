import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcoesItemPedidoPage } from './opcoes-item-pedido.page';
import { DatabaseService } from 'src/app/services/database.service';
import { IonicStorageModule } from '@ionic/storage';
import { PopoverController, AngularDelegate } from '@ionic/angular';

describe('PopoverPage', () => {
  let component: OpcoesItemPedidoPage;
  let fixture: ComponentFixture<OpcoesItemPedidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcoesItemPedidoPage ],
      imports: [ IonicStorageModule.forRoot(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ DatabaseService, PopoverController, AngularDelegate]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcoesItemPedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
