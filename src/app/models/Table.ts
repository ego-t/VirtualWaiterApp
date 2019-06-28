import { Consumer } from './Consumer';
import { Control } from './Control';

export interface Table {
    id?: number;
    numero?: number;
    codigo?: string;
    enumestadomesa: EnumEstadoMesa;
    estabelecimento?: any;
    comandas?: Control[];
    ativo?: boolean;
    responsavel?: Consumer;
}


export enum EnumEstadoMesa {
    Vaga = 1,
    Ocupada = 2,
}

export interface Status {
    name: string;
    value: EnumEstadoMesa;
}

const statusOptions: Status[] = [
    {
        name: 'Vaga',
        value: EnumEstadoMesa.Vaga
    },
    {
        name: 'Ocupada',
        value: EnumEstadoMesa.Ocupada
    }
];


export { statusOptions };
