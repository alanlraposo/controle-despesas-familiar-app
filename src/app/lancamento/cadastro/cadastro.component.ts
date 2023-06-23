import { Component, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Data, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Lancamento } from 'src/app/model/lancamento';
import { LancamentoStorageService } from '../lancamento-storage-service';
import { LancamentoService } from 'src/app/service/lancamento.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  providers: [ LancamentoStorageService ]
})

export class CadastroComponent implements OnInit {

  @ViewChild('form') form!: NgForm;

  lancamento!: Lancamento;

  editar = false;

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(public route: ActivatedRoute, public router: Router, private _lancamentoService: LancamentoService) {
  }

  ngOnInit(): void {
    this.lancamento = new Lancamento(0, '', '', '', 0, '');
    this.lancamento.id = this.route.snapshot.params['id'];
    this.lancamento.usuario = this.route.snapshot.params['usuario'];
    this.lancamento.tipo = this.route.snapshot.params['tipo'];
    this.lancamento.descricao = this.route.snapshot.params['descricao'];
    this.lancamento.valor = this.route.snapshot.params['valor'];
    this.lancamento.forma = this.route.snapshot.params['forma'];

    if(this.lancamento.id != null){
      this.editar = true;
    } else {
      this.lancamento.id = new Date().getTime();
    }
  }

  voltarLista() {
    this.router.navigate(['/lancamento']);
  }

  salvar() {
    console.log("salvar");

    if(this.editar){

      console.log("atualizar");
      let self = this;
      let myPromise = new Promise(function(myResolve, myReject) {
          self._lancamentoService.update(self.lancamento.id, self.lancamento).subscribe(
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
          self.isShowMessage = true;
          self.isSuccess = true;
          self.message = 'Atualizado com sucesso!';
        },
        function(error) {
          self.isShowMessage = true;
          self.isSuccess = false;
          self.message = 'Erro ao atualizar o lançamento!';
        }
      );

    } else {

      console.log("cadastrar");
      let self = this;
      let myPromise = new Promise(function(myResolve, myReject) {
        self._lancamentoService.save(self.lancamento).subscribe(
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
          self.isShowMessage = true;
          self.isSuccess = true;
          self.message = 'Cadastrado com sucesso!';
        },
        function(error) {
          self.isShowMessage = true;
          self.isSuccess = false;
          self.message = 'Erro ao cadastrar o lançamento!';
        }
      );
    }

    this.form.reset();
    this.lancamento.id = new Date().getTime();
  }
}
