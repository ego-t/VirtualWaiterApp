import { ItemProduct } from './ItemProduct';

export interface Order {
    id?: number;
    codigo: string;
    datahora: Date;
    comanda: any;
    itens: ItemProduct[];
}
