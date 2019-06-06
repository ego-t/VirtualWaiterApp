import { Session } from './Session';

export interface Menu {
    id?: number;
    descricao: string;
    secoes?: Session[];
    ativo: boolean;
}
