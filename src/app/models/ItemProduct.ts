import { Product } from './Product';
import { Order } from './Order';

export class ItemProduct {
    id: number;
    quantidade: number;
    observacoes: string;
    preco: number;
    precoTotal: number;
    entregue: boolean;
    produto: Product;
}
