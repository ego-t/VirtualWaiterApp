
export class Product {
  id?: number;
  nome: string;
  descricao: string;
  preco: number;
  foto: string;
  empromocao: boolean;
  descontopromocional?: number;
  ativo: boolean;
  tempopreparo: number;
  estabelecimento: number;
  secao: number;
  category?: string;
}
