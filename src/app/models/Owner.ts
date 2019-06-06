import { User } from './User';
export interface Owner {
  id?: number;
  nome: string;
  sobrenome: string;
  datanascimento: Date;
  cpf: string;
  rg: number;
  enumorgaoemissor: number;
  celular: string;
  usuario: User;
}
