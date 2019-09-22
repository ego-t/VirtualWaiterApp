import { ItemProduct } from './../models/ItemProduct';
import { Product } from './../models/Product';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Establishment } from '../models/Establishment';
import { Table } from '../models/Table';

const ITEMPRODUTO_KEY = 'my-itemsProduct';

@Injectable()
export class DatabaseService {
  KEY_INPAGE_ESTABLISHMENT = 'establishmentInPage';
  KEY_CURRENT_TABLE = 'TableCurrent';
  constructor(public storage: Storage ) { }

  // CREATE
  async addItemProduct(itemProduct: ItemProduct): Promise<any> {
    const dataAtual = new Date();
    itemProduct.id = dataAtual.getTime();

    const itensProduct = await this.storage.get(ITEMPRODUTO_KEY);

    if (itensProduct) {
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
  deleteItemProduct(id: number) {
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

  deleteAllProducts() {
    const toKeep: ItemProduct[] = [];
    return this.storage.set(ITEMPRODUTO_KEY, toKeep);
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
  setEstablishmentPage(establishment: Establishment) {
    sessionStorage.setItem(this.KEY_INPAGE_ESTABLISHMENT, JSON.stringify(establishment));
  }

  getEstablishmentPage(): Establishment {
    const retorno: Establishment = JSON.parse(sessionStorage.getItem(this.KEY_INPAGE_ESTABLISHMENT));
    return retorno;
  }

  setTableScaned(table: Table) {
    sessionStorage.setItem(this.KEY_CURRENT_TABLE, JSON.stringify(table));
  }

  getTableScaned(): Table {
    const retorno: Table = JSON.parse(sessionStorage.getItem(this.KEY_CURRENT_TABLE));
    return retorno;
  }
}
