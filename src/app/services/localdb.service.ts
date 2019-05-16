import { SQLite, SQLiteObject } from  '@ionic-native/sqlite/ngx';
import { Injectable } from '@angular/core';


@Injectable()
export class LocaldbService {

  constructor(private sqlite: SQLite) { }

  public getBD(){
    return this.sqlite.create({
      name: 'virtualdb',
      location: 'default'
    });
  }

  public criarBanco(){
    return this.getBD().then((db: SQLiteObject) => {
      this.criarTabelas(db);
    }).catch(e => console.error(e));
  }

  private criarTabelas(db: SQLiteObject){
    db.sqlBatch(
      ['CREATE TABLE IF NOT EXISTS pedido (id integer primary key NOT NULL, nomeProduto VARCHAR(100) );']
    ).then(() => {      
      console.log("Criado database local");
    }).catch(e => console.error(e));
  }
}