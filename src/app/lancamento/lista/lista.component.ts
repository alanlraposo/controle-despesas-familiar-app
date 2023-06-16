import { Component, OnInit, ViewChild  } from '@angular/core';
import { Data, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { LancamentoStorageService } from '../lancamento-storage-service';
import { Lancamento } from 'src/app/model/lancamento';
import { Shared } from 'src/app/util/shared';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  providers: [ LancamentoStorageService ],
})

export class ListaComponent implements OnInit {

  @ViewChild('form') form!: NgForm;

  lancamentos?: Lancamento[];

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(public router: Router, private lancamentoService: LancamentoStorageService) {
  }

  ngOnInit(): void {
    Shared.initializeWebStorage();
    this.lancamentos = this.lancamentoService.getLancamentos();
  }

  adicionarLancamento() {
    this.router.navigate(['/lancamento/cadastro']);
  }

  editarLancamento(lancamento: {id: number; usuario: any; tipo: any; descricao: any; valor: number; forma: any;}): void {
    this.router.navigate(['/lancamento/cadastro', lancamento.id, lancamento.usuario, lancamento.tipo, lancamento.descricao, lancamento.valor, lancamento.forma]);
  }

  deletarLancamento(lancamento: {id: number; usuario: any; tipo: any; descricao: any; valor: number; forma: any;}): void {
    let dialogo = confirm("Deseja realmente excluir o lançamento #" + lancamento.id +"?");
    if (dialogo) {
      let response: boolean = this.lancamentoService.delete(lancamento);
      this.isShowMessage = true;
      this.isSuccess = response;
      if (response) {
        this.message = 'O lançamento foi excluido com sucesso!';
      } else {
        this.message = 'Erro ao excluior o lançamento!';
      }
      this.lancamentos = this.lancamentoService.getLancamentos();
    }
  }
}
