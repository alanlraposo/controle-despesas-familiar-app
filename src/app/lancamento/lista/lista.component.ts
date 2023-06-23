import { Component, OnInit, ViewChild  } from '@angular/core';
import { Data, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Lancamento } from 'src/app/model/lancamento';
import { Shared } from 'src/app/util/shared';
import { LancamentoService } from 'src/app/service/lancamento.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})

export class ListaComponent implements OnInit {

  @ViewChild('form') form!: NgForm;

  lancamentos!: Lancamento[];

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(public router: Router, private _lancamentoService: LancamentoService) {
    this.carregarLancamentos();
  }

  ngOnInit(): void {
  }

  carregarLancamentos(){
    let self = this;
    let myPromise = new Promise(function(myResolve, myReject) {
      self._lancamentoService.getLancamentos().subscribe(
        listaLancamentos => {
          self.lancamentos = listaLancamentos.map(
            item=>{
              return new Lancamento(item.id, item.usuario, item.tipo, item.descricao, item.valor, item.forma);
            }
          );
          myResolve("OK");
        },
        err => {
          myReject("Error");
        }
      );
    });
    myPromise.then(
      function(value) {
        console.log("Sucesso ao coletar dados da API");
      },
      function(error) {
        console.log("Erro ao coletar a lista de receitas da API!")
      }
    );
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
      let self = this;
      let myPromise = new Promise(function(myResolve, myReject) {
        self._lancamentoService.delete(lancamento.id).subscribe(
          lancamento => {
            myResolve("OK");
          },
          err => {
            myReject("Error");
          }
        );
      });

      myPromise.then(
        function(value) {
          for (let i = 0; i < self.lancamentos.length; i++) {
            if (self.lancamentos[i].id == lancamento.id) {
              self.lancamentos.splice(i, 1);
            }
          }

          self.isShowMessage = true;
          self.isSuccess = true;
          self.message = 'O lançamento foi excluido com sucesso!';
        },

        function(error) {
          self.isShowMessage = true;
          self.isSuccess = false;
          self.message = 'Erro ao excluir o lançamento!';
        }
      );
    }
  }
}
