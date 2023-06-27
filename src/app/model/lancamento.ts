export class Lancamento {
  id: number;
  usuario: string;
  tipo: string;
  descricao: string;
  valor: number;
  forma: string;
  dataInclusao: number;

  constructor(id: number, usuario: string, tipo: string, descricao: string, valor: number, forma: string, dataInclusao: number) {
    this.id = id;
    this.usuario = usuario;
    this.tipo = tipo;
    this.descricao = descricao;
    this.valor = valor;
    this.forma = forma;
    this.dataInclusao = dataInclusao;
  }
}
