import { IonicStorageModule } from '@ionic/storage';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoPage } from './pedido.page';
import { RouterTestingModule } from '@angular/router/testing';
import { DatabaseService } from '../services/database.service';
import { PopoverController, AngularDelegate, ModalController } from '@ionic/angular';
import { OrderService } from '../services/order.service';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { UserService } from '../services/user.service';
import { Alerta } from '../Utils/Alerta';
import { AuthenticationService } from '../services/authentication.service';
import { ControlService } from '../services/control.service';

describe('PedidoPage', () => {
  let component: PedidoPage;
  let fixture: ComponentFixture<PedidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoPage],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([]),
        AngularFireModule.initializeApp(environment.firebase),
        IonicStorageModule.forRoot(),
        AngularFireAuthModule,
        AngularFirestoreModule, ],
      providers: [DatabaseService, UserService,  Alerta, Storage, AngularDelegate, ModalController,
        AuthenticationService, ControlService, OrderService, PopoverController ],
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
