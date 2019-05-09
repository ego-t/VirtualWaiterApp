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
  
  constructor(public afAuth: AngularFireAuth,
    public user: UserService, 
    public router:Router) { }

  ngOnInit() {
    // console.log(this.srcImg);
  }

  async login()
  {
    const {username , password} = this;
    try{
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username +'@virtualwaiter.com',password)

      console.log(res);

      if(res.user){
        this.user.setUser({
          username,
          uid: res.user.uid
        })
        this.router.navigate(['/home'])
      }

      console.log(this.user.getUID());

    }catch(err){
      console.dir(err);
      if(err.code === "auth/user-not-found")
      {
        console.log("Usuário não encontrado");
      }

    }
  }

}
