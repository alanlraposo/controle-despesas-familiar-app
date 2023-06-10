import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';

export interface Lancamento {
  id: number;
  usuario: string;
  tipo: string;
  descricao: string;
  valor: number;
  forma: string;
}

const lancamentosInit: Lancamento[] = [
  { id: 1, usuario: 'Alan Raposo', tipo: 'Entrada', descricao: 'Salario',  valor: 10000.00, forma: 'PIX' },
  { id: 2, usuario: 'Alan Luiz', tipo: 'Saída', descricao: 'Carro Chevette Pneus', valor: 1000.00, forma: 'Dinheiro' },
  { id: 3, usuario: 'Alan Raposo', tipo: 'Saída', descricao: 'Carro Caravan Escapamento', valor: 2000.00, forma: 'PIX' }
];

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})

export class ListaComponent implements OnInit {

  constructor(public router: Router) {
  }

  lancamentos = lancamentosInit;

  ngOnInit(): void {
  }

  adicionarLancamento() {
    this.router.navigate(['/lancamento/cadastro']);
  }

  editarLancamento(lancamento: {id: any; usuario: any; tipo: any; descricao: any; valor: any; forma: any;}): void {
    this.router.navigate(['/lancamento/cadastro', lancamento.id, lancamento.usuario, lancamento.tipo, lancamento.descricao, lancamento.valor, lancamento.forma]);
  }

  deletarLancamento(lancamento: {id: any; usuario: any; tipo: any; descricao: any; valor: any; forma: any;}): void {
    let dialogo = confirm("Deseja realmente excluir o lançamento?");
    if (dialogo) {
      for (let i = 0; i < this.lancamentos.length; i++) {
        if (this.lancamentos[i].id == lancamento.id) {
          this.lancamentos.splice(i, 1);
        }
      }
    }
  }
}
