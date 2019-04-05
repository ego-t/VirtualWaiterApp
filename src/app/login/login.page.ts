import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  srcImg = "../../../resources/logoComDescricao.png";
  
  constructor() { }

  ngOnInit() {
    // console.log(this.srcImg);
  }

}
