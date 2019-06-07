import { ItemProduct } from './../models/ItemProduct';
import { Product } from './../models/Product';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const ITEMPRODUTO_KEY = 'my-itemsProduct';

@Injectable()
export class DatabaseService {

  constructor(public storage: Storage) { }

  // CREATE
  async addItemProduct(itemProduct: ItemProduct): Promise<any> {
    
    const dataAtual = new Date();
    
    itemProduct.id = dataAtual.getTime();

    const itensProduct = await this.storage.get(ITEMPRODUTO_KEY);

    if (itensProduct) {
      // for (const itemPedido of itensProduct) {
      //   if (itemPedido.pr.id === produto.id) {
      //     throw new Error('Produto já adicionado');
      //   }
      // }
      itensProduct.push(itemProduct);

      return this.storage.set(ITEMPRODUTO_KEY, itensProduct);
    } else {
      return this.storage.set(ITEMPRODUTO_KEY, [itemProduct]);
    }
  }

  // READ
  getItensProducts(): Promise<ItemProduct[]> {
    return this.storage.get(ITEMPRODUTO_KEY);
  }

  // UPDATE
  updateItemProduct(itemProduct: ItemProduct): Promise<any> {
    return this.storage.get(ITEMPRODUTO_KEY).then((itemProducts: ItemProduct[]) => {
      if (!itemProducts || itemProducts.length === 0) {
        return null;
      }

      const newItensProducts: ItemProduct[] = [];

      for (const i of itemProducts) {
        if (i.id === itemProduct.id) {
          newItensProducts.push(itemProduct);
        } else {
          newItensProducts.push(i);
        }
      }

      return this.storage.set(ITEMPRODUTO_KEY, newItensProducts);
    });
  }

  // DELETE
  deleteItemProduct(id: number): Promise<ItemProduct> {
    return this.storage.get(ITEMPRODUTO_KEY).then((itemProducts: ItemProduct[]) => {
      if (!itemProducts || itemProducts.length === 0) {
        throw new Error('Seu pedido está vazio.');
      }

      const toKeep: ItemProduct[] = [];

      for (const i of itemProducts) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMPRODUTO_KEY, toKeep);
    });
  }

  async getTotalPedido() {
    let valorRetorno = 0;

    const produtos = await this.storage.get(ITEMPRODUTO_KEY);

    if (produtos) {
      for (const produtoJaNoPedido of produtos) {
        valorRetorno += Number(produtoJaNoPedido.preco);
      }
    }
    return valorRetorno;
  }
}
