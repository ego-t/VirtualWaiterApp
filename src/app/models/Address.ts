export interface Address {
  id?: number;
  bairro: string;
  cidade: string;
  uf: string;
  logradouro: string;
  cep: string;
  complemento: string;
  numero: number;
}

const UF: string[] = [ 'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF',
'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB',
'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS',
'SC', 'SE', 'SP', 'TO',
];

export { UF };

