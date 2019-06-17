import { Consumer } from './../models/Consumer';
import { ConsumerService } from './../services/consumer.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../services/user.service';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-externo',
  templateUrl: './login-externo.page.html',
  styleUrls: ['./login-externo.page.scss'],
})
export class LoginExternoPage implements OnInit {
  processando = false;

  constructor(public afAuth: AngularFireAuth, public userService: UserService, 
    private consumerService: ConsumerService,
    private router: Router) {
    this.processando = true;
  }

  ionViewDidEnter() {
    console.log('Entrou na tela login externo');

    this.afAuth.user.subscribe( (result: firebase.User) => {

      this.userService.getByUID(result.uid).subscribe( (userData: User[]) => {

        if (userData.length > 0) {
          this.consumerService.getByIdUsuario(userData[0].id).subscribe( (consumerData: Consumer[]) => {

            if (consumerData.length > 0) {
              // Apenas definir usuario
              this.userService.setUser(consumerData[0].usuario);
              this.router.navigate(['/home']);
            }
            else {
              //criar Consumidor
              this.userService.registerConsumer(result);
            }
          console.log(consumerData);
          });
        } else {
          // Criar Usuario e consumidor
          this.userService.registerConsumer(result);
        }
      });
    });
  }

  ngOnInit() {
  }

}
