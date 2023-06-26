export class Usuario {
  id: number;
  nome: string;
  cpf: string;
  descricao: string;
  dataInclusao: number;

  constructor(id: number, nome: string, cpf: string, descricao: string, dataInclusao: number) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.descricao = descricao;
    this.dataInclusao = dataInclusao;
  }
}
