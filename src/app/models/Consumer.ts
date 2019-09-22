import { User } from './User';
import { Control } from './Control';
import { Evaluation } from './Evaluation';

export interface Consumer {
    id?: number;
    nome: string;
    datanascimento?: Date;
    celular: string;
    usuario?: User;
    avaliacoes?: Evaluation[];
    comandasresponsaveis?: Control[];
}
