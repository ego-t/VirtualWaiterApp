import { ControlService } from './../services/control.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { ItemCardapioPage } from './item-cardapio.page';
import { DatabaseService } from '../services/database.service';
import { IonicStorageModule } from '@ionic/storage';
import { Alerta } from '../Utils/Alerta';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { ModalController, AngularDelegate } from '@ionic/angular';

describe('ItemCardapioPage', () => {
  let component: ItemCardapioPage;
  let fixture: ComponentFixture<ItemCardapioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCardapioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([]),
        AngularFireModule.initializeApp(environment.firebase),
        IonicStorageModule.forRoot(),
        AngularFireAuthModule,
        AngularFirestoreModule, ],
      providers: [ DatabaseService,
        Alerta,
        ControlService,
        OrderService,
        UserService,
        AuthenticationService,
        ModalController,
        AngularDelegate ]
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
