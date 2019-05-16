import { SQLite, SQLiteObject } from  '@ionic-native/sqlite/ngx';
import { Injectable } from '@angular/core';


@Injectable()
export class LocaldbService {

  constructor(private sqlite: SQLite) { }
}