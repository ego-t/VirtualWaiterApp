import { Establishment } from 'src/app/models/Establishment';
import { Table } from './Table';
import { Consumer } from './Consumer';
import { Order } from './Order';
import { Evaluation } from './Evaluation';

export class Control  {
    id?: number;
    enumsituacaocomanda: EnumSituacaoComanda;
    horarioinicio: Date;
    horariofim?: Date;
    consumidores?: Consumer[];
    mesa?: any;
    pedidos?: Order[];
    contas?: Account[];
    avaliacoes?: Evaluation[];
    responsavel: Consumer;
}

export  enum EnumSituacaoComanda {
    Solicitada = 1,
    Ativa = 2,
    AguardandoPagamento = 3,
    Encerrada = 4,
}
