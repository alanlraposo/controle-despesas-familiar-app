export class Usuario {
  id: number;
  nome: string;
  cpf: string;
  descricao: string;

  constructor(id: number, nome: string, cpf: string, descricao: string) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.descricao = descricao;
  }
}
