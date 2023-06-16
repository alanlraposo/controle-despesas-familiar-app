export class Lancamento {
  id: number;
  usuario: string;
  tipo: string;
  descricao: string;
  valor: number;
  forma: string;

  constructor(id: number, usuario: string, tipo: string, descricao: string, valor: number, forma: string) {
    this.id = id;
    this.usuario = usuario;
    this.tipo = tipo;
    this.descricao = descricao;
    this.valor = valor;
    this.forma = forma;
  }
}
