
export interface Account {
    id?: number;
    total: number;
    taxaservico: number;
    enumformapagamento: EnumFormaPagamento;
    comanda: any;
}

export  enum EnumFormaPagamento {
    CartaoCredito = 1,
    CartaoDebito = 2,
    Dinheiro = 3,
    ValeRefeicao = 4,
    Gratuito = 5,
}

export interface Payment {
    name: string;
    value: EnumFormaPagamento;
}

const paymentOptions: Payment[] = [
    {
        name: 'Cartao de Credito',
        value: EnumFormaPagamento.CartaoCredito
    },
    {
        name: 'Cartao de Debito',
        value: EnumFormaPagamento.CartaoDebito,
    },
    {
        name: 'Dinheiro',
        value: EnumFormaPagamento.Dinheiro
    },
    {
        name: 'Vale-Refeicao',
        value: EnumFormaPagamento.ValeRefeicao,
    },
    {
        name: 'Gratuito',
        value: EnumFormaPagamento.Gratuito
    },

];

export { paymentOptions };
