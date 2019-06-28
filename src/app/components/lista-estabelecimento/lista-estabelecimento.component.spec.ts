import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEstabelecimentoComponent } from './lista-estabelecimento.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { Alerta } from 'src/app/Utils/Alerta';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DatabaseService } from 'src/app/services/database.service';
import { IonicStorageModule } from '@ionic/storage';
import { AngularDelegate, ModalController } from '@ionic/angular';
import { ControlService } from 'src/app/services/control.service';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';

describe('ListaEstabelecimentoComponent', () => {
  let component: ListaEstabelecimentoComponent;
  let fixture: ComponentFixture<ListaEstabelecimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEstabelecimentoComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([]),
        AngularFireModule.initializeApp(environment.firebase),
        IonicStorageModule.forRoot(),
        AngularFireAuthModule,
        AngularFirestoreModule, ],
      providers: [DatabaseService, UserService,  Alerta, Storage, AngularDelegate, ModalController,
        AuthenticationService, ControlService, OrderService, QRScanner ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEstabelecimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
