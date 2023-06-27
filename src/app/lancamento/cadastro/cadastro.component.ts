import { Component, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Data, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Lancamento } from 'src/app/model/lancamento';
import { LancamentoStorageService } from '../lancamento-storage-service';
import { LancamentoService } from 'src/app/service/lancamento.service';
import { FormaLancamento } from 'src/app/model/forma-lancamento';
import { TipoLancamento } from 'src/app/model/tipo-lancamento';
import { UsuarioService } from 'src/app/service/usuario.service';
import { UsuarioLancamento } from 'src/app/model/usuario-lancamento';
import { Usuario } from 'src/app/model/usuario';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  providers: [ LancamentoStorageService ]
})

export class CadastroComponent implements OnInit {

  @ViewChild('form') form!: NgForm;

  lancamento!: Lancamento;
  valorTela!: string;

  editar = false;

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  usuarioLancamentos : UsuarioLancamento[] = [];

  tipoLancamentos : TipoLancamento[] = [
    {tipo: 'Entrada'},
    {tipo: 'Saída'},
  ];

  formaLancamentos: FormaLancamento[] = [
    {forma: 'Pix'},
    {forma: 'Dinheiro'},
    {forma: 'Transferência'},
    {forma: 'Cartão'},
  ];

  constructor(public route: ActivatedRoute, public router: Router, private _lancamentoService: LancamentoService, private _usuarioService: UsuarioService) {
    this.carregarUsuarios();
  }

  ngOnInit(): void {
    this.lancamento = new Lancamento(0, '', '', '', 0, '', 0);
    this.lancamento.id = this.route.snapshot.params['id'];
    this.lancamento.usuario = this.route.snapshot.params['usuario'];
    this.lancamento.tipo = this.route.snapshot.params['tipo'];
    this.lancamento.descricao = this.route.snapshot.params['descricao'];
    this.lancamento.valor = this.route.snapshot.params['valor'];
    this.lancamento.forma = this.route.snapshot.params['forma'];
    this.lancamento.dataInclusao = this.route.snapshot.params['dataInclusao'];

    if(this.lancamento.id != null){
      this.editar = true;
      var valorTelaAux = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL',}).format(this.lancamento.valor);
      this.valorTela = valorTelaAux.replace("R$", "").trimStart();
    } else {
      this.lancamento.id = new Date().getTime();
      this.lancamento.dataInclusao = new Date().getTime();
    }
  }

  carregarUsuarios(){
    let self = this;
    let myPromise = new Promise(function(myResolve, myReject) {
      self._usuarioService.getUsuarios().subscribe(
        listaUsuarios => {
          self.usuarioLancamentos = listaUsuarios.map(
            item=>{
              return new UsuarioLancamento(item.nome);
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
        console.log("Erro ao coletar a lista de usuários da API!")
      }
    );
  }

  voltarLista() {
    this.router.navigate(['/lancamento']);
  }

  salvar() {
    console.log("salvar");

    var valorAux =  this.valorTela.toString().replace(".", "").replace(",", ".");
    this.lancamento.valor = parseFloat(valorAux);

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
    this.editar = false;
    this.lancamento.id = new Date().getTime();
    this.lancamento.dataInclusao = new Date().getTime();
    this.valorTela = "";
  }
}
