import { Product } from './Product';

export class ItemProduct {
    id: number;
    quantidade: number;
    observacoes: string;
    preco: number;
    entregue: boolean;
    produto: Product;
}
