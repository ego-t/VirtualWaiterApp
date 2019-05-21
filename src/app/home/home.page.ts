import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  constructor(private storage: Storage) {
    
    // this.storage.set('name', 'Max');

    // this.storage.get('name').then((val) => {
    //   alert('Your name is ' + val);
    //   console.log('Your name is', val);
    // });
  }
}
