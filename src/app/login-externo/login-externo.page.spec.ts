import { AuthenticationService } from './../services/authentication.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginExternoPage } from './login-externo.page';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { IonicStorageModule } from '@ionic/storage';
import { ShareModule } from '../share.module';
import { UserService } from '../services/user.service';
import { Alerta } from '../Utils/Alerta';
import { DatabaseService } from '../services/database.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('LoginExternoPage', () => {
  let component: LoginExternoPage;
  let fixture: ComponentFixture<LoginExternoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [UserService, Alerta, Storage, DatabaseService, HttpClient, HttpHandler, AuthenticationService ],
      imports: [
        RouterTestingModule.withRoutes([]),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        IonicStorageModule.forRoot(),
        ShareModule
      ],
      declarations: [ LoginExternoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginExternoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
