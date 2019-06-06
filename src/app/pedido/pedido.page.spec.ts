import { IonicStorageModule } from '@ionic/storage';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoPage } from './pedido.page';
import { RouterTestingModule } from '@angular/router/testing';
import { DatabaseService } from '../services/database.service';
import { PopoverController, AngularDelegate } from '@ionic/angular';

describe('PedidoPage', () => {
  let component: PedidoPage;
  let fixture: ComponentFixture<PedidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoPage],
      providers: [DatabaseService, PopoverController, AngularDelegate ],
      imports: [RouterTestingModule.withRoutes([]),
      IonicStorageModule.forRoot(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
