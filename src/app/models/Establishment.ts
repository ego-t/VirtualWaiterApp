import { Address } from './Address';
import { Employee } from './Employee';
import { Owner } from './Owner';
export interface Establishment {
  id?: number;
  razaosocial: string;
  cnpj: string;
  nome: string;
  descricao?: string;
  horariofuncionamento: string;
  telefone: string;
  logo?: string;
  avaliacaomedia?: number;
  ativo?: boolean;
  aberto?: boolean;
  funcionarios?: Employee[];
  /* mesas?: Board[]; */
  /* produtos?: Product[]; */
  especialidade: number;
  endereco: Address;
  dono?: Owner;
}
