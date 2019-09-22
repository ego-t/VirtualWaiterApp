import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarMesaPage } from './buscar-mesa.page';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicStorageModule } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { Alerta } from '../Utils/Alerta';
import { ControlService } from '../services/control.service';
import { OrderService } from '../services/order.service';
import { DatabaseService } from '../services/database.service';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { ModalController, AngularDelegate } from '@ionic/angular';

describe('BuscarMesaPage', () => {
  let component: BuscarMesaPage;
  let fixture: ComponentFixture<BuscarMesaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarMesaPage ],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([]),
        AngularFireModule.initializeApp(environment.firebase),
        IonicStorageModule.forRoot(),
        AngularFireAuthModule,
        AngularFirestoreModule, ],
      providers: [DatabaseService, UserService,  Alerta, Storage, AngularDelegate, ModalController,
        AuthenticationService, ControlService, OrderService, QRScanner ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarMesaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
