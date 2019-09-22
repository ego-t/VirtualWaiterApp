import { Consumer } from './../models/Consumer';
import { ConsumerService } from './../services/consumer.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../services/user.service';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login-externo',
  templateUrl: './login-externo.page.html',
  styleUrls: ['./login-externo.page.scss'],
})
export class LoginExternoPage implements OnInit {
  processando = false;

  constructor(public afAuth: AngularFireAuth, public userService: UserService, 
    private consumerService: ConsumerService,
    public authenticationservice: AuthenticationService,
    private router: Router) {
    this.processando = true;
  }

  ionViewDidEnter() {
    console.log('Entrou na tela login externo');

    this.authenticationservice.RealizarLoginExterno(true).catch( (error: Error) => {
      this.router.navigate(['/login']);
    });
  }

  ngOnInit() {
  }

}
