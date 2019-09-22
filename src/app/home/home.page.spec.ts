import { DatabaseService } from './../services/database.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { HomePage } from './home.page';
import { IonicStorageModule } from '@ionic/storage';
import { AuthenticationService } from '../services/authentication.service';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Alerta } from '../Utils/Alerta';
import { environment } from 'src/environments/environment';
import { AngularDelegate, ModalController } from '@ionic/angular';
import { ControlService } from '../services/control.service';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([]),
        AngularFireModule.initializeApp(environment.firebase),
        IonicStorageModule.forRoot(),
        AngularFireAuthModule,
        AngularFirestoreModule, ],
      providers: [DatabaseService, UserService,  Alerta, Storage, AngularDelegate, ModalController,
        AuthenticationService, ControlService, OrderService, ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
