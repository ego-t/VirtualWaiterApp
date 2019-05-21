import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const PRODUTO_KEY = 'my-items';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private storage: Storage) { }
  
  // CREATE
  addProduto(produto: Produto): Promise<any> {
    return this.storage.get(PRODUTO_KEY).then((produtos: Produto[]) => {

      if (produtos) {
        produtos.push(produto);
        return this.storage.set(PRODUTO_KEY, produtos);
      } else {
        return this.storage.set(PRODUTO_KEY, [produto]);
      }
    });
  }

  // READ
  getProdutos(): Promise<Produto[]> {
    return this.storage.get(PRODUTO_KEY);
  }

  // UPDATE
  updateProduto(produto: Produto): Promise<any> {
    return this.storage.get(PRODUTO_KEY).then((produtos: Produto[]) => {
      if (!produtos || produtos.length === 0) {
        return null;
      }

      const newProdutos: Produto[] = [];

      for (let i of produtos) {
        if (i.id === produto.id) {
          newProdutos.push(produto);
        } else {
          newProdutos.push(i);
        }
      }

      return this.storage.set(PRODUTO_KEY, newProdutos);
    });
  }

  // DELETE
  deleteProduto(id: number): Promise<Produto> {
    return this.storage.get(PRODUTO_KEY).then((produtos: Produto[]) => {
      if (!produtos || produtos.length === 0) {
        return null;
      }

      let toKeep: Produto[] = [];

      for (let i of produtos) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(PRODUTO_KEY, toKeep);
    });
  }
}

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  foto: string;
  empromocao: boolean;
  descontopromocional: number;
  ativo: boolean;
  datahora: Date;
}
