import { Item } from './Item';

export interface Order {
    id?: number;
    codigo: string;
    datahora: Date;
    comanda: any;
    itens: Item[];
}
