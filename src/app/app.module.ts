import { PopoverPageModule } from './pages/popover/popover.module';
import { Alerta } from './Utils/Alerta';
import { NgModule, LOCALE_ID  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UserService } from './services/user.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { ShareModule } from './share.module';
import { IonicStorageModule } from '@ionic/storage';
import { DatabaseService } from './services/database.service';
import { ComponentsModule } from './components/components.module';
import {registerLocaleData} from '@angular/common';
import pt from '@angular/common/locales/pt';
registerLocaleData(pt, 'pt-BR');

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ShareModule,
    ComponentsModule,
    IonicStorageModule.forRoot(),
    ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UserService,
    Alerta,
    DatabaseService,
    Storage,
  ],
  bootstrap: [AppComponent],
  schemas: []
})
export class AppModule {}
