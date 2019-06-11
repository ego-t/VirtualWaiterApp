import { Product } from './Product';


export interface Session {
    id?: number;
    descricao: string;
    produtos?: Product[];
    cardapio: number;
    ativo: boolean;
}
