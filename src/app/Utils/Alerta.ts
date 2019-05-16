import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable()
export class Alerta {
  
  constructor(public alert: AlertController){ }

  async showAlert(header : string, message: string)
  {
    const alert =  await this.alert.create(
    {
      header,
      message,
      buttons : ["Ok"]
    })
    await alert.present();
  }
}