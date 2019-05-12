import { Alerta } from './../Utils/Alerta';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  srcImg = "../../../resources/logoComDescricao.png";
  username : string = "";
  password : string = "";
  processando: boolean = false;
  
  constructor(public afAuth: AngularFireAuth,
    public user: UserService, 
    public router:Router,
    public alerta: Alerta) { }

  ngOnInit() {
    // console.log(this.srcImg);
  }

  async login()
  {
    const {username , password} = this;
    try{
      this.processando = true;

      const res = await this.afAuth.auth.signInWithEmailAndPassword(username +'@virtualwaiter.com',password)

      if(res.user){
        this.user.setUser({
          username,
          uid: res.user.uid
        })
        this.router.navigate(['/home'])
      }

      console.log(this.user.getUID());
      //this.processando = false;

    }catch(err){
      console.dir(err);
      
      var msgRetorno = ""

      switch (err.code) {
        case "auth/invalid-email":
          msgRetorno = "Usuário inválido"
          break;
        case "auth/user-not-found":
          msgRetorno = "Usuário não encontrado"
          break;
        case "auth/network-request-failed":
          msgRetorno = "Não foi possível se conectar a rede"
          break;
        case "auth/wrong-password":
          msgRetorno = "Senha inválida"
          break;
        default:
          msgRetorno = "Ocorreu um erro não conhecido."
          break;
      }

      if(msgRetorno != ""){
        this.alerta.showAlert("Error", msgRetorno)
      }

      console.log(err);
      this.processando = false;
    }
  }
}
