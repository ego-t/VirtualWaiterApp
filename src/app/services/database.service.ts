import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';


export interface Pedido {
  idpedido: number,
  nome: string,
  valor: number
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
 
  Pedidos = new BehaviorSubject([]);
 
  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then((readySource) => {
      console.log('Platform ready from', readySource);
      
      this.sqlite.create({ name: 'Pedidos.db', location: 'default'}).then((db: SQLiteObject) => {
        this.database = db;
        this.seedDatabase();
        alert('Banco Criado');
      });
    });
  }
 
  seedDatabase() {
    this.http.get('./../../assets/seed.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          this.loadPedidos();
          //this.loadProducts();
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
    });
  }
 
  getDatabaseState() {
    return this.dbReady.asObservable();
  }
 
  getPedidos(): Observable<Pedido[]> {
    return this.Pedidos.asObservable();
  }


  loadPedidos() {
    return this.database.executeSql('SELECT * FROM Pedido', []).then(data => {
      let Pedidos: Pedido[] = [];
 
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          Pedidos.push({ 
            idpedido: data.rows.item(i).idpedido,
            nome: data.rows.item(i).nome, 
            valor: data.rows.item(i).valor
           });
        }
      }
      this.Pedidos.next(Pedidos);
    });
  }
 
  addPedido(nome, valor) {
    let data = [nome, valor];
    return this.database.executeSql('INSERT INTO Pedido (nome, valor) VALUES (?, ?, ?)', data).then(data => {
      this.loadPedidos();
    });
  }
 
  getPedido(id): Promise<Pedido> {
    return this.database.executeSql('SELECT * FROM Pedido WHERE idpedido = ?', [id]).then(data => {
      return {
        idpedido: data.rows.item(0).idpedido,
        nome: data.rows.item(0).nome, 
        valor: data.rows.item(0).valor}
    });
  }
  
 
  deletePedido(id) {
    return this.database.executeSql('DELETE FROM Pedido WHERE idpedido = ?', [id]).then(_ => {
      this.loadPedidos();
    });
  }
 
  updatePedido(Pedido: Pedido) {
    let data = [Pedido.nome, Pedido.valor];
    return this.database.executeSql(`UPDATE Pedido SET nome = ?, valor = ? WHERE id = ${Pedido.idpedido}`, data).then(data => {
      this.loadPedidos();
    })
  }
}
