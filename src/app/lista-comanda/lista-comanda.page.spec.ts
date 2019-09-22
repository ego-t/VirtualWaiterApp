import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaComandaPage } from './lista-comanda.page';
import { DatabaseService } from '../services/database.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { UserService } from '../services/user.service';
import { Alerta } from '../Utils/Alerta';
import { AngularDelegate, ModalController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { ControlService } from '../services/control.service';
import { OrderService } from '../services/order.service';

describe('ListaComandaPage', () => {
  let component: ListaComandaPage;
  let fixture: ComponentFixture<ListaComandaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaComandaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([]),
        AngularFireModule.initializeApp(environment.firebase),
        IonicStorageModule.forRoot(),
        AngularFireAuthModule,
        AngularFirestoreModule, ],
      providers: [DatabaseService, UserService,  Alerta, Storage, AngularDelegate, ModalController,
        AuthenticationService, ControlService, OrderService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaComandaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
